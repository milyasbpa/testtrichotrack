export const RouterFunctions = {
  setBackURL: (data: { defaultURL: string }) => {
    if (window.history.state && window.history.state.idx > 0) {
      return "#";
    } else {
      return data.defaultURL;
    }
  },
  getSearchParams: (data: IterableIterator<[string, string]>) => {
    const paramsObj = Object.fromEntries(data);
    const urlSearchParams = new URLSearchParams(paramsObj);
    return urlSearchParams;
  },
};
