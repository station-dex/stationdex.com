import { getExplorerData } from "./data";

const getDataFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let page = parseInt(urlParams.get("page") || "1");
  let sortBy = urlParams.get("sortBy") ?? "";
  let sortDirection = urlParams.get("sortDirection") ?? "";
  let eventSearch = urlParams.get("eventSearch") ?? "";
  let contractSearch = urlParams.get("contractSearch") ?? "";
  let fromSearch = urlParams.get("fromSearch") ?? "";
  let networkSearch = urlParams.get("networkSearch") ?? "";
  let fromDate = urlParams.get("fromDate") ?? "";
  let toDate = urlParams.get("toDate") ?? "";
  let transactionHash = urlParams.get("transactionHash") ?? "";
  let blockNumber = urlParams.get("blockNumber") ?? "";

  return {
    page,
    sortBy,
    sortDirection,
	eventSearch,
	contractSearch,
	fromSearch,
	networkSearch,
	fromDate,
	toDate,
	transactionHash,
	blockNumber
  };
};

const buildUrlWithQueries = () => {
  const { totalPage, ...data }: any = getExplorerData();
  const searchParams = new URLSearchParams();

  Object.keys(data).forEach((el) => {
    if (data[el]) {
      searchParams.set(el, data[el]);
    }
  });

  return `?${searchParams.toString()}`;
};

const navigateSilently = (shouldReplace: boolean = false) => {
  if (shouldReplace) {
    history.replaceState(getExplorerData(), "", buildUrlWithQueries());
  } else {
    history.pushState(getExplorerData(), "", buildUrlWithQueries());
  }
};

export { getDataFromUrl, buildUrlWithQueries, navigateSilently };
