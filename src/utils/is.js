const { toString } = Object.prototype;

export const is = (val, type) => {
  return toString.call(val) === `[object ${type}]`;
};

export const isString = (val) => {
  return is(val, 'String');
};

export const isDef = (val) => {
  return typeof val !== 'undefined';
};

export const isUnDef = (val) => {
  return !isDef(val);
};

export const isNull = (val) => {
  return val === null;
};

export const isNullAndUnDef = (val) => {
  return isUnDef(val) && isNull(val);
};

export const isNullOrUnDef = (val) => {
  return isUnDef(val) || isNull(val);
};

export const isArray = (val) => {
  return val && Array.isArray(val);
};

export const isObject = (val) => {
  return val !== null && is(val, 'Object');
};

export const isEmpty = (val) => {
  if (isNullOrUnDef(val)) {
    return true;
  }

  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
};
