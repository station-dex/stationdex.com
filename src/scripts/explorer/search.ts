import { debounce } from "@/util/debounce"
import { getExplorerData, setExplorerData } from "./data"
import { fetchDataAndRenderTable } from "./fetch"
import { etherAddressBasicValidate } from "./utils";
import { navigateSilently } from "./history";

let eventSearchQuery = '';
let contractSearchQuery = '';
let fromSearchQuery = '';
let networkSearchQuery = '';
let fromDateSearchQuery = '';
let toDateSearchQuery = '';
let txnHashSearchQuery = '';
let blockNumberSearchQuery = '';

const eventSearchInput = document.querySelector('#eventSearch') as HTMLInputElement
const contractSearchInput = document.querySelector('#contractSearch') as HTMLInputElement
const fromAddressSearchInput = document.querySelector('#transactionSenderSearch') as HTMLInputElement
const networkSearchInput = document.querySelector('#networkSearch') as HTMLInputElement
const fromDateInput = document.querySelector('#fromDateSearch') as HTMLInputElement
const toDateInput = document.querySelector('#toDateSearch') as HTMLInputElement
const txnHashSearchInput = document.querySelector('#transactionHashSearch') as HTMLInputElement
const blockNumberSearchInput = document.querySelector('#blockSearch') as HTMLInputElement

const handleSearch = () =>{
  fetchDataAndRenderTable();
  navigateSilently();
}

const setupEventSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (eventSearchQuery !== searchQuery) {
      eventSearchQuery = searchQuery
      setExplorerData('eventSearch', searchQuery)
      handleSearch()
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue);
  };

  eventSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupContractSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (contractSearchQuery !== searchQuery) {
      contractSearchQuery = searchQuery
      if(etherAddressBasicValidate(searchQuery)){
        setExplorerData('contractSearch', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue);
  };

  contractSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupFromSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (fromSearchQuery !== searchQuery) {
      fromSearchQuery = searchQuery
      if(etherAddressBasicValidate(searchQuery)){
        setExplorerData('fromSearch', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue);
  };

  fromAddressSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupNetworkSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (networkSearchQuery !== searchQuery) {
      networkSearchQuery = searchQuery
      if(['195', '196', ''].includes(searchQuery)){
        setExplorerData('networkSearch', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue ?? '');
  };

  networkSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupFromDateSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (fromDateSearchQuery !== searchQuery) {
      fromDateSearchQuery = searchQuery
        setExplorerData('fromDate', searchQuery)
        handleSearch()
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue ?? '');
  };

  fromDateInput?.addEventListener(
    "change",
    onKeyup,
    { passive: true }
  );
}

const setupToDateSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (toDateSearchQuery !== searchQuery) {
      toDateSearchQuery = searchQuery
        setExplorerData('toDate', searchQuery)
        handleSearch()
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue ?? '');
  };

  toDateInput?.addEventListener(
    "change",
    onKeyup,
    { passive: true }
  );
}

const resetSearchInputs = () =>{
  const { eventSearch, contractSearch, fromSearch, networkSearch, fromDate, toDate, transactionHash, blockNumber } = getExplorerData();

  if(eventSearchInput) {
    eventSearchInput.value = eventSearch;
    eventSearchQuery = eventSearch;
  }

  if(contractSearchInput) {
    contractSearchInput.value = contractSearch;
    contractSearchQuery = contractSearch;
  }

  if(fromAddressSearchInput) {
    fromAddressSearchInput.value = fromSearch;
    fromSearchQuery = fromSearch;
  }

  if(networkSearchInput) {
    networkSearchInput.value = networkSearch;
    networkSearchQuery = networkSearch;
  }

  if(txnHashSearchInput) {
    txnHashSearchInput.value = transactionHash;
    txnHashSearchQuery = transactionHash;
  }

  if(blockNumberSearchInput) {
    blockNumberSearchInput.value = blockNumber;
    blockNumberSearchQuery = blockNumber;
  }

  if(fromDateInput) {
    fromDateInput.value = fromDate;
    fromDateSearchQuery = fromDate;
    if(fromDate) fromDateInput.type = 'date'
  }

  if(toDateInput) {
    toDateInput.value = toDate;
    toDateSearchQuery = toDate;
    if(toDate) toDateInput.type = 'date'
  }
}

const setupBlockSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (networkSearchQuery !== searchQuery) {
      networkSearchQuery = searchQuery
      if(!searchQuery || searchQuery.length > 2){
        setExplorerData('blockNumber', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue ?? '');
  };

  blockNumberSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupTxnHashSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (networkSearchQuery !== searchQuery) {
      networkSearchQuery = searchQuery
      if(etherAddressBasicValidate(searchQuery)){
        setExplorerData('transactionHash', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    searchDebounce(inputValue ?? '');
  };

  txnHashSearchInput?.addEventListener(
    "keyup",
    onKeyup,
    { passive: true }
  );
}

const setupSearch = (): void => {
  resetSearchInputs();
  setupEventSearch();
  setupContractSearch();
  setupFromSearch();
  setupNetworkSearch();
  setupFromDateSearch();
  setupToDateSearch();
  setupBlockSearch();
  setupTxnHashSearch();
}

export { setupSearch, resetSearchInputs }
