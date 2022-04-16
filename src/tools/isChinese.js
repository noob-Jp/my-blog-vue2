export const isChinese = (str) => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  if (reg.test(str)) {
    return true;
  }
}