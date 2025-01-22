export default (enumsData) => {
  const modelsData = {};
  Object.keys(enumsData).map((enumKey) => {
    const currentEnumsData = enumsData[enumKey];
    modelsData[enumKey] = {};

    Object.keys(currentEnumsData).map((enumItemKey) => {
      modelsData[enumKey][enumItemKey] = currentEnumsData[enumItemKey].map(
        (item) => {
          return {
            label: item.label,
            value: item.value,
          };
        }
      );
    });
  });

  return modelsData;
};
