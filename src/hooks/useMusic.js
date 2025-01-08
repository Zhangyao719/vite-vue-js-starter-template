import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/modules/app';

const useMusic = () => {
  const appStore = useAppStore();
  const { appConfig } = storeToRefs(appStore);

  const musicRef = useTemplateRef('musicRef');
  const musicState = ref(true); // 音乐播放状态 true: 播放 false: 停止
  const musicConfig = computed(() => appConfig.value.music); // 全局共享的音乐配置

  // 利用计算属性绑定class
  const classMusic = computed(() => {
    return {
      'lottery-music': true,
      stoped: !musicState.value,
    };
  });

  // 切换音乐播放状态
  const toggleMusic = () => {
    musicState.value = !musicState.value;
    if (musicState.value) {
      musicRef.value && musicRef.value.play();
    } else {
      musicRef.value && musicRef.value.pause();
    }
  };

  // 切换音乐配置
  const selectMusic = (config) => {
    appStore.setAppConfig({ music: config });
  };

  onMounted(() => {
    toggleMusic();
  });

  return {
    musicRef,
    musicState,
    classMusic,
    musicConfig,
    selectMusic,
    toggleMusic,
  };
};

export default useMusic;
