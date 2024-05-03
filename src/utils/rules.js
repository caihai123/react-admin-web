export const path = {
  pattern: /^\/[\w-/]*$/,
  message: "必须以斜杠开头，后跟字母、数字、下划线、中划线或斜杠",
};

export const chinese = {
  // 正则来源：https://any86.github.io/any-rule/
  pattern:
    /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
  message: "只能是中文/汉字",
};

export const id = {
  pattern: /^[a-z][a-z0-9-]*$/,
  message: "只能是小写字母、中划线和数字组成，且必须以字母开头",
};
