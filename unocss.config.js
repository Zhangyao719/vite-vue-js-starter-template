import {
  presetAttributify,
  presetIcons,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { defineConfig } from 'unocss/vite';
import presetChinese from 'unocss-preset-chinese';
import presetEase from 'unocss-preset-ease';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetChinese(),
    presetEase(),
    presetTypography(),
    presetIcons({
      scale: 1.5,
      warn: true,
    }),
  ],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-end', 'flex items-end justify-between'],
    ['mx-center', 'my-0 mx-auto'],
    ['absolute-center', 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
