<template>
  <section class="h-full text-center relative">
    <img
      width="20%"
      src="https://pic.snsboat.com/saas/normal/customer/61/83/A76QZ8LWcsYNLHkvZ56QZ8lw/2024/11/14/e0a3cb444e06ef6fe41a263828e11808.png"
      alt=""
    />
    <div
      class="text text-[200px] tracking-normal bg-clip-text text-transparent cursor-none break-all font-bold select-auto pointer-events-none leading-tight font"
    >
      年 会 盛 典
    </div>
    <footer class="text-#fff176 absolute bottom-120px left-1/2 transform -translate-x-1/2">
      <p class="text-[50px]">
        <img class="align-bottom" src="@/assets/imgs/logo.png" width="50" height="auto" alt="" />
        江苏恒科新材料有限公司
        <span class="block text-[20px] mt-4">技术支持 —— 恒科信息部</span>
      </p>
    </footer>

    <div class="left-icon absolute left-5% bottom-8% w-20%">
      <img
        width="100%"
        src="https://pic.snsboat.com/saas/normal/customer/61/83/A76QZ8LWcsYNLHkvZ56QZ8lw/2024/11/14/99fff346dd21db2e3d92cff5d22ea0d2.png"
        alt=""
      />
    </div>
    <div class="right-icon absolute right-5% bottom-8% w-20%">
      <img
        width="100%"
        src="https://pic.snsboat.com/saas/normal/customer/61/83/A76QZ8LWcsYNLHkvZ56QZ8lw/2024/11/14/abc77358c23da0516f84bb74fb1a7532.png"
        alt=""
      />
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'ScreenWelcome',
});
</script>

<style scoped>
.text {
  background-image: linear-gradient(
    -180deg,
    rgb(255 241 167) 26.82%,
    rgb(255 236 83) 63.18%,
    rgb(231 105 26) 85.91%
  );
  writing-mode: horizontal-tb;
  text-orientation: upright;
}

@keyframes shakeY {
  0%,
  100% {
    transform: translateZ(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -0.27rem, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 0.27rem, 0);
  }
}

.left-icon,
.right-icon {
  animation-name: shakeY;
  animation-duration: 3s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}
</style>
