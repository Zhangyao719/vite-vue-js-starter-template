export const setRem = () => {
  const { width } = document.documentElement.getBoundingClientRect();

  // 移动端适配
  if (width < 768) {
    const fontSize = width / 15; // 动态计算 rem，将屏幕宽度分成 15 份
    document.documentElement.style.fontSize = Number.parseFloat(fontSize).toFixed(4) + 'px';
  }
};
