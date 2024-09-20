export const RegexFunctions = {
  checkAnySchemaIsInvalid: (data: {
    items: { id: string; name: string; regex: string }[];
    value: string;
  }) => {
    return data.items.reduce((acc, item) => {
      const regex = new RegExp(item.regex);
      return acc || !regex.test(data.value);
    }, false);
  },
};
