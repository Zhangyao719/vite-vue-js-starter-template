import { useDictStoreWithOut } from '@/store/modules/dict';

const dictStore = useDictStoreWithOut();

export const getDictOptions = (dictType) => {
  return dictStore.getDictByType(dictType) || [];
};

export const getIntDictOptions = (dictType) => {
  // 获得通用的 DictDataType 列表
  const dictOptions = getDictOptions(dictType);
  // 转换成 number 类型的 NumberDictDataType 类型
  const dictOption = [];
  dictOptions.forEach((dict) => {
    dictOption.push({
      ...dict,
      value: parseInt(dict.value + ''),
    });
  });
  return dictOption;
};

export const getStrDictOptions = (dictType) => {
  const dictOption = [];
  const dictOptions = getDictOptions(dictType);
  dictOptions.forEach((dict) => {
    dictOption.push({
      ...dict,
      value: dict.value + '',
    });
  });
  return dictOption;
};

/**
 * 获取指定字典类型的指定值对应的字典对象
 * @param dictType 字典类型
 * @param value 字典值
 * @return DictDataType 字典对象
 */
export const getDictObj = (dictType, value) => {
  const dictOptions = getDictOptions(dictType);
  for (const dict of dictOptions) {
    if (dict.value === value + '') {
      return dict;
    }
  }
};

/**
 * 获得字典数据的文本展示
 *
 * @param dictType 字典类型
 * @param value 字典数据的值
 * @return 字典名称
 */
export const getDictLabel = (dictType, value) => {
  const dictOptions = getDictOptions(dictType);
  const dictLabel = ref('');
  dictOptions.forEach((dict) => {
    if (dict.value === value + '') {
      dictLabel.value = dict.label;
    }
  });
  return dictLabel.value;
};

export const DICT_TYPE = {
  // todo: 添加奖项类型
};
