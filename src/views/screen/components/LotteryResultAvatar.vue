<template>
  <!-- 烟花特效 -->
  <div class="fixed top-0 flex justify-between">
    <img
      class="w-30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
    <img
      class="w-30%"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/4fa93a852d6171ddf5775875e00fb07d.gif"
      alt=""
    />
  </div>

  <!-- 中奖名单 -->
  <div class="zoom-in-down h-55vh mx-10% py-3vh bg-black/15 overflow-y-auto scrollbar">
    <ul class="flex justify-evenly items-center flex-wrap gap-2vh min-h-full select-none">
      <li
        v-for="(user, index) in winningUsers"
        :key="user.id"
        class="avatar-item flex-shrink-0 flex-basis-13vh relative"
      >
        <!-- 头像 -->
        <div
          class="bg-no-repeat bg-cover bg-center rounded-1/2 overflow-hidden w-full"
          :style="{ backgroundImage: `url(${user.headimgurl})` }"
        >
          <!-- 动态头像框 -->
          <img
            class="avatar-rotate w-full"
            src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/55fefd5d1efca0f25371cbe0f91886ec.png?v=51&imageMogr2/0/w/3000"
            alt=""
          />
        </div>
        <span class="text-#fff176 text-sm font-bold">{{ user.nickname || '' }}</span>
        <!-- 删除 -->
        <t-popconfirm
          :popupProps="{ visible: isOpen && currentUserId === user.id }"
          content="确认删除（无法恢复）？"
          theme="danger"
          @cancel="isOpen = false"
        >
          <icon-font
            name="close-circle"
            class="close-icon absolute top-0 right-0 hover:cursor-pointer color-white invisible"
            @click="openPopconfirm(user.id)"
          />
          <template #confirmBtn>
            <t-button size="small" style="margin-left: 1rem" :loading="loading" @click="onDelete(index)">确定</t-button>
          </template>
        </t-popconfirm>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject, defineExpose, defineProps } from 'vue';
import { IconFont } from 'tdesign-icons-vue-next';
import { deleteWinner } from '@/api';
import { useEmitt } from '@/hooks/useEmitt';

defineOptions({
  name: 'LotteryResultAvatar',
});

const props = defineProps({
  isRecordPage: {
    type: Boolean,
    required: true,
  },
});

const { winningUsers, setWinningUsers } = inject('winningUsers');

//#region 删除中奖用户
const isOpen = ref(false);
const currentUserId = ref();

// 打开删除弹窗
const openPopconfirm = (id) => {
  currentUserId.value = id;
  isOpen.value = true;
};

// 删除用户
const { emitter } = useEmitt();
const loading = ref(false);
const onDelete = async (index) => {
  loading.value = true;
  try {
    await deleteWinner(currentUserId.value);

    if (props.isRecordPage) {
      // 中奖记录页，删除后需要重新获取所有中奖用户
      emitter.emit('refreshRecord');
    } else {
      // 中奖结果页， 删除后直接从数组中同步剔除该用户
      winningUsers.value.splice(index, 1);
      setWinningUsers(winningUsers.value);
    }
  } finally {
    loading.value = false;
    isOpen.value = false;
  }
};

// 暴露删除 loading（当用户删除中，底部操作按钮需要禁用）
defineExpose({
  deleteLoading: loading,
});
//#endregion
</script>

<style scoped lang="less">
@import url('@/style/mixin.less');

.zoom-in-down {
  animation-name: zoomInDown;
  animation-fill-mode: both;
  animation-duration: 1s;
}

.avatar-item {
  &:hover {
    .close-icon {
      visibility: visible;
    }
  }

  .avatar-rotate {
    animation: rotate 5s linear infinite;
  }
}
</style>
