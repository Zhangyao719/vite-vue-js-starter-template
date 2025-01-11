import { onBeforeUnmount } from 'vue';
import mitt from 'mitt';

const emitter = mitt();

export const useEmitt = (option) => {
  if (option) {
    emitter.on(option.name, option.callback);

    onBeforeUnmount(() => {
      emitter.off(option.name);
    });
  }

  return {
    emitter,
  };
};
