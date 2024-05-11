/**
 * 通过文件地址获取文件名
 * @param {string} filePath 文件地址
 * @returns 文件名
 */
export const getFilenameFromPath = function (filePath) {
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

export const a = 1;
