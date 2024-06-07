let explorer_data = {
  page: 1,
  totalPage: 0,
  sortBy: "",
  sortDirection: "",
  eventSearch: "",
  contractSearch: "",
  fromSearch: "",
  networkSearch: "",
  fromDate: "",
  toDate: "",
  transactionHash: "",
  blockNumber: "",
};

const setExplorerData = (
  key: keyof typeof explorer_data,
  val: number | string
) => {
  if (!Object.keys(explorer_data).includes(key)) return;
  explorer_data = { ...explorer_data, [key]: val };
};

const explorerData = {
  get: () => {
    return explorer_data;
  },
  set: (key: keyof typeof explorer_data, val: number | string) => {
    setExplorerData(key, val);
	return explorerData;
  },
};

const getExplorerData = () => {
  return explorer_data;
};

export { setExplorerData, getExplorerData, explorerData };
