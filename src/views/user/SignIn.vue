<template>
  <div id="user-wrapper" class="w-full h-full relative">
    <t-loading :loading="loading" attach="#user-wrapper" size="1.5rem" style="

--td-brand-color: #fedc83" />
    <!-- 用户信息 -->
    <div class="w-full h-1/2 flex-center flex-col">
      <t-avatar :image="userInfo.headimgurl" size="3.5rem" />
      <div class="text-#FEDC83 text-center">
        <p class="text-base font-bold mt-4">{{ userInfo.nickname || '用户昵称' }}</p>
        <p class="mt-3">
          您是第
          <span class="text-white text-sm">{{ userInfo.currentNum || 0 }}</span>
          位签到嘉宾
        </p>
        <p class="mt-3">{{ userInfo.createTime || '1970-01-01 00:00:00' }}</p>
      </div>
    </div>

    <!-- 操作栏（后续有新增，可以使用 grid 布局） -->
    <div class="w-full h-1/2 absolute bottom-0 px-3 pb-3">
      <div class="mx-auto w-15 h-15 bg-gray-950/30 rounded text-center pt-2" @click="handleCommand">
        <img class="w-1/2" src="@/assets/imgs/button.png" alt="" />
        <span class="block mt-1 text-#FEDC83">
          {{ isLogin ? '已签到' : '签到' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { DialogPlugin } from 'tdesign-vue-next';
import { authorize, handleUnlogin } from '@/utils/authorize';
import { signIn } from '@/api/user';
import useCache from '@/utils/storage';
import { ACTIVITY_ID } from '@/utils/constant';
import { formatToDateTime } from '@/utils/date';

defineOptions({
  name: 'SignIn', // 签到即登录
});

const route = useRoute();

const { wsCache, CACHE_KEY } = useCache();

const userInfo = reactive(wsCache.get(CACHE_KEY.USER) || {});
const isLogin = computed(() => !!userInfo.accessToken);

//#region 操作栏
const wxCode = ref('');
const loading = ref(false);
const handleCommand = async (/* command */) => {
  if (isLogin.value) return;
  loading.value = true;
  try {
    const info = await signIn(wxCode.value, ACTIVITY_ID.YEAR2025);
    info.createTime = formatToDateTime(info.createTime);
    wsCache.set(CACHE_KEY.USER, info);
    Object.assign(userInfo, info);
  } catch (err) {
    DialogPlugin.alert({
      width: '70%',
      header: '系统提示',
      body: '签到失败，请重新授权登录。',
      closeBtn: false,
      closeOnOverlayClick: false,
      closeOnEscKeydown: false,
      onConfirm() {
        handleUnlogin();
      },
    });
  } finally {
    loading.value = false;
  }
};
//#endregion

onBeforeMount(() => {
  if (isLogin.value) return;

  const { code } = route.query;
  if (code) {
    wxCode.value = code;
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
</style>
