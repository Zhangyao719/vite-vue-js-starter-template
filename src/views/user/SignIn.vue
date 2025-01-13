<template>
  <div id="user-wrapper" class="w-full h-full relative">
    <!-- eslint-disable-next-line -->
    <t-loading
      :loading="loading"
      attach="#user-wrapper"
      size="1.5rem"
      style="

        --td-brand-color: #fedc83;

        background-color: transparent;
      "
    />
    <!-- 用户信息 -->
    <div class="w-full h-1/2 flex-center flex-col">
      <t-avatar :image="userInfo.headimgurl" size="3.5rem" />
      <div class="text-#FEDC83 text-center">
        <p class="text-base font-bold mt-4">{{ userInfo.nickname }}</p>
        <p class="mt-3">
          您是第
          <span class="text-white text-sm">{{ userInfo.currentNum }}</span>
          位签到嘉宾
        </p>
        <p class="mt-3">{{ userInfo.createTime }}</p>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="w-full h-1/2 absolute bottom-0 px-3 pb-3 flex justify-center gap-4">
      <div
        v-for="item in OPERATIONS"
        :key="item.value"
        class="w-15 h-15 bg-gray-950/30 rounded text-center p-2"
        @click="handleCommand(item.value)"
      >
        <div class="icon w-70% h-70% m-[0_auto] relative">
          <icon-font :name="item.icon" size="1rem" class="absolute-center" style="color: #fedc83"></icon-font>
        </div>
        <span class="block mt-1 text-#FEDC83">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { IconFont } from 'tdesign-icons-vue-next';
import { authorize } from '@/utils/authorize';
import { signIn, getPrizeInfoByOpenId } from '@/api';
import useCache from '@/utils/storage';
import { formatToDateTime } from '@/utils/date';
import { OPERATIONS } from './config';

defineOptions({
  name: 'SignIn', // 签到即登录
});

const route = useRoute();

const { wsCache, CACHE_KEY } = useCache();

const userInfo = reactive({
  headimgurl: 'https://tdesign.gtimg.com/site/avatar.jpg',
  nickname: '用户昵称',
  currentNum: 0,
  createTime: '1970-01-01 00:00:00',
});
const isLogin = computed(() => !!userInfo.accessToken);

//#region 操作栏
const wxCode = ref('');
const loading = ref(false);
const handleCommand = async (command) => {
  switch (command) {
    case 'signIn':
      {
        if (isLogin.value) return MessagePlugin.info('您已经签到啦~ 🎉');
        loading.value = true;
        try {
          const info = await signIn(wxCode.value);
          info.createTime = formatToDateTime(info.createTime);
          wsCache.set(CACHE_KEY.USER, info);
          Object.assign(userInfo, info);
        } finally {
          loading.value = false;
        }
      }
      break;
    case 'winRecord':
      {
        if (!isLogin.value) return MessagePlugin.info('您还没有登录哦~ 🤪');
        loading.value = true;
        try {
          const msg = await getPrizeInfoByOpenId(userInfo.openid);
          const alertDia = DialogPlugin.alert({
            width: '70%',
            header: '系统提示',
            body: msg,
            closeBtn: false,
            closeOnOverlayClick: false,
            closeOnEscKeydown: false,
            onConfirm: () => alertDia.hide(),
          });
        } finally {
          loading.value = false;
        }
      }
      break;
    default:
      break;
  }
};
//#endregion

onBeforeMount(() => {
  const { code } = route.query;
  if (code) {
    wxCode.value = code;
    // 自动为用户签到一次
    handleCommand('signIn').then(() => {
      MessagePlugin.info('自动签到成功~ 🎉');
    });
  } else {
    DialogPlugin.confirm({
      width: '70%',
      header: '系统提示',
      body: '系统没有检测到微信授权码，请重新授权。',
      theme: 'warning',
      closeBtn: false,
      cancelBtn: null,
      closeOnOverlayClick: false,
      closeOnEscKeydown: false,
      onConfirm: () => {
        authorize();
      },
    });
  }
});
</script>

<style scoped lang="less">
#user-wrapper {
  background-image: url('../../../src/assets/imgs/bgi.png');
  background-size: cover;
}

.icon {
  background-image: url('../../../src/assets/imgs/button.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
