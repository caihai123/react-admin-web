const createDict = function (dict) {
  return {
    enum: Object.fromEntries(dict.map(({ alias, value }) => [alias, value])),
    options: dict.map(({ label, value }) => ({ label, value })),
  };
};

const dict = {
  gender: createDict([
    { label: "男", value: 1, alias: "male" },
    { label: "女", value: 2, alias: "woman" },
  ]),
};

export default dict;
