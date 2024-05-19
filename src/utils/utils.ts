/**
 * 通过文件地址获取文件名
 * @param {string} filePath 文件地址
 * @returns 文件名
 */
export const getFilenameFromPath = function (filePath: string) {
  // 使用路径分隔符（/）来分割路径，并获取最后一个元素（文件名）
  const parts = filePath.split("/");
  const filenameWithParams = parts[parts.length - 1];

  // 查找文件名中的最后一个点
  const lastDotIndex = filenameWithParams.lastIndexOf(".");

  // 如果没有点或点在文件名的第一个字符位置，则返回原文件名
  if (lastDotIndex <= 0) {
    return filenameWithParams;
  }

  // 返回点之前的部分作为文件名
  const filename = filenameWithParams.substring(0, lastDotIndex);

  // 返回文件名加上后缀部分
  const extension = filenameWithParams.substring(lastDotIndex);
  return filename + extension;
};

// ================================ 分割线 ================================

/**
 * 数据深拷贝
 * @param {any} obj - 需要深拷贝的对象或数组
 * @returns {any} - 深拷贝后的新对象或数组
 */
export const deepCopy = function <T extends any>(obj: T): T {
  // 如果是基本数据类型或 null，则直接返回
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建一个新对象或数组，根据原始对象的类型来判断
  const newObj = (Array.isArray(obj) ? [] : {}) as T;

  // 遍历原始对象的属性或数组元素
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归调用深拷贝函数，复制属性值
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
};
