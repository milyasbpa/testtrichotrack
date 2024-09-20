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

export const insightBarChartDataFormatter = (
  data: number[],
  resolution: number,
  bin: number // number of labels in bar chart
) => {
  let barChart: number[][] = [];
  // MODEL
  // RESOLUTION: 1
  // [
  //    [data[0]+data[1]+data[2], data[3]+data[4]+data[5]]
  // ]
  // RESOLUTION: 1/3
  // [
  //    [data[0],data[3],data[6],data[9],data[12]],
  //    [data[1],data[4],data[7],data[10],data[13]],
  //    [data[2],data[5],data[8],data[11],data[14]]
  // ]

  // ARRAY DIMENSION LOOP
  for (let i = 0; i < 1 / resolution; i++) {
    let bar: number[] = [];
    // ARRAY LENGTH LOOP ALWAYS 5
    for (let j = 0; j < bin; j++) {
      let accNumber: number = 0;
      const summationLength = data.length / (bin / resolution);
      //   SUMMATION LOOP
      for (let k = 0; k < summationLength; k++) {
        accNumber =
          accNumber + data[((j * 1) / resolution) * summationLength + (i + k)];
      }
      bar = [...bar, accNumber];
    }

    barChart = [...barChart, bar];
  }
  return barChart;
};
