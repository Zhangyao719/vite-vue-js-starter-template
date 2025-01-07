import { computed, onMounted, ref, useTemplateRef } from 'vue';

const useMusic = () => {
  const musicRef = useTemplateRef('musicRef');
  const musicState = ref(false); // 音乐播放状态

  // 利用计算属性绑定class
  const classMusic = computed(() => {
    return {
      'lottery-music': true,
      stoped: musicState.value,
    };
  });

  // 切换音乐播放状态
  const toggleMusic = () => {
    musicState.value = !musicState.value;
    if (musicState.value) {
      musicRef.value && musicRef.value.pause();
    } else {
      musicRef.value && musicRef.value.play();
    }
  };

  onMounted(() => {
    toggleMusic();
  });

  return {
    musicRef,
    musicState,
    toggleMusic,
    classMusic,
  };
};

export default useMusic;
