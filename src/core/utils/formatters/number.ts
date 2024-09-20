export const numberFormatter = {
  replaceCharWithEmptyString(data: string) {
    const result = data.replace(/[^\d]/g, "");
    return result;
  },
  replaceNumberWithChineseNumber: (number: number) => {
    const chineseNumbers: { [key: string]: string } = {
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
      6: "六",
      7: "七",
      8: "八",
      9: "九",
      10: "十",
      20: "二十",
      30: "三十",
      40: "四十",
      50: "五十",
      60: "六十",
      70: "七十",
      80: "八十",
      90: "九十",
      100: "一百",
      200: "二百",
      300: "三百",
      400: "四百",
      500: "五百",
      600: "六百",
      700: "七百",
      800: "八百",
      900: "九百",
      1000: "一千",
      10000: "一万",
      1000000: "一百万",
    };

    // Function to handle numbers between 1 and 9999
    function getChineseNumber(num: number): string {
      if (num <= 10 || chineseNumbers[num]) {
        return chineseNumbers[num];
      }

      if (num < 100) {
        const tens = Math.floor(num / 10) * 10;
        const ones = num % 10;
        return ones === 0
          ? chineseNumbers[tens]
          : chineseNumbers[tens] + chineseNumbers[ones];
      }

      if (num < 1000) {
        const hundreds = Math.floor(num / 100) * 100;
        const remainder = num % 100;
        return remainder === 0
          ? chineseNumbers[hundreds]
          : chineseNumbers[hundreds] + getChineseNumber(remainder);
      }

      if (num < 10000) {
        const thousands = Math.floor(num / 1000) * 1000;
        const remainder = num % 1000;
        return remainder === 0
          ? chineseNumbers[thousands]
          : chineseNumbers[thousands] + getChineseNumber(remainder);
      }

      return "";
    }

    // Handling numbers between 10000 and 99999
    function getChineseTenThousand(num: number): string {
      if (num < 10000) return getChineseNumber(num);
      const tenThousands = Math.floor(num / 10000);
      const remainder = num % 10000;
      return remainder === 0
        ? chineseNumbers[tenThousands] + "万"
        : chineseNumbers[tenThousands] + "万" + getChineseNumber(remainder);
    }

    // Handling numbers between 100000 and 999999
    function getChineseHundredThousand(num: number): string {
      if (num < 100000) return getChineseTenThousand(num);
      const hundredThousands = Math.floor(num / 100000);
      const remainder = num % 100000;
      return remainder === 0
        ? chineseNumbers[hundredThousands] + "十万"
        : chineseNumbers[hundredThousands] +
            "十万" +
            getChineseNumber(remainder);
    }

    // Handling numbers between 1,000,000
    if (number >= 1000000) {
      return chineseNumbers[1000000];
    }

    // Handling numbers between 100000 and 999999
    if (number >= 100000) {
      return getChineseHundredThousand(number);
    }

    // Handling numbers between 10000 and 99999
    if (number >= 10000) {
      return getChineseTenThousand(number);
    }

    // Handling numbers less than 10000
    return getChineseNumber(number);
  },
};
