export const createNewBarChartData = (
  rawData: number[][],
  availableSlot: number,
  resolution: number,
  startAge: number,
  endAge: number
) => {
  let finalData: number[] = [];
  for (let array = 0; array < availableSlot; array++) {
    let total = 0;
    for (let position = 0; position < resolution; position++) {
      const count =
        rawData.filter((item) => item[0] >= startAge && item[0] <= endAge)[
          array * resolution + position
        ] === undefined
          ? 0
          : rawData.filter((item) => item[0] >= startAge && item[0] <= endAge)[
              array * resolution + position
            ][1];

      total = total + count;
    }
    finalData = [...finalData, total];
  }

  return finalData;
};

export const createNewBarChartLabels = (
  rawData: number[][],
  availableSlot: number,
  resolution: number,
  startAge: number,
  endAge: number
) => {
  let finalLabels: string[] = [];
  if (resolution !== 1) {
    for (let i = 0; i < availableSlot; i++) {
      const startLabel = i * resolution + startAge;
      const endLabel =
        (i + 1) * resolution + startAge - 1 >= 100
          ? 100
          : (i + 1) * resolution + startAge - 1;
      let label =
        startLabel === endLabel
          ? `${startLabel}`
          : `${startLabel} - ${endLabel}`;

      finalLabels = [...finalLabels, label];
    }
  } else {
    finalLabels = rawData
      .filter((item) => item[0] >= startAge && item[0] <= endAge)
      .map((item) => `${item[0]}`);
  }

  return finalLabels;
};
