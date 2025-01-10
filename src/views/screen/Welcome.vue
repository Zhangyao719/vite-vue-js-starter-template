<template>
  <section class="h-full text-center relative">
    <img
      class="w-20vw h-16vh"
      src="https://pic.snsboat.com/saas/normal/customer/61/83/A76QZ8LWcsYNLHkvZ56QZ8lw/2024/11/14/e0a3cb444e06ef6fe41a263828e11808.png"
      alt=""
    />

    <!-- 活动名称 -->
    <div class="select-none leading-relaxed font-bold break-all pointer-events-none tracking-3 mt-3vh">
      <h1 class="text-8vh text-#fff176 font-bold">福满恒力一家亲</h1>
      <h1 class="text text-7vh font-bold">恒力集团2025年新春联欢晚会</h1>
      <h1 class="text-6vh text-#fff176 font-bold">（南通站）</h1>
    </div>

    <footer class="text-#fff176 absolute bottom-12vh left-1/2 transform -translate-x-1/2">
      <p class="text-5vh">
        <img class="align-middle w-5vh" src="@/assets/imgs/logo.png" height="auto" alt="" />
        恒科信息部
      </p>
    </footer>

    <div class="left-icon absolute left-5% bottom-8% w-20%">
      <img
        class="w-full"
        src="https://pic.snsboat.com/saas/normal/customer/61/83/A76QZ8LWcsYNLHkvZ56QZ8lw/2024/11/14/99fff346dd21db2e3d92cff5d22ea0d2.png"
        alt=""
      />
    </div>
    <div class="right-icon absolute right-5% bottom-8% w-20%">
      <img
        class="w-full"
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
  color: transparent;
  background-image: linear-gradient(-180deg, rgb(255 241 167) 26.82%, rgb(255 236 83) 63.18%, rgb(231 105 26) 85.91%);
  background-clip: text;
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
