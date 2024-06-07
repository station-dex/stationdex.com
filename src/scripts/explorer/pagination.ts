import { getExplorerData } from "./data";
import { fetchDataAndRenderTable } from "./fetch";
import { navigateSilently } from "./history";

const _paginationLinks = document.querySelector("#pagination-mid-container") as HTMLDivElement;
const _paginationPrev = document.querySelector("#pagination-prev") as HTMLButtonElement;
const _paginationNext = document.querySelector("#pagination-next") as HTMLButtonElement;

const renderPaginationNumbers = (start: number, end: number) => {
  const { page } = getExplorerData();
  if (!_paginationLinks) return;
  for (let i = start; i <= end; i++) {
    const _active = i === page;
    _paginationLinks.innerHTML += `
				<button data-type="goto-page" data-page="${i}" class="pagination-numbers ${_active ? "active" : ""}">
				  ${i}
				</button>
			`;
  }
};

const resetPagination = () => {
  const { page, totalPage } = getExplorerData();

  if (page === 1 || totalPage < 1) {
    _paginationPrev.disabled = true;
  } else {
    _paginationPrev.disabled = false;
  }

  if (page === totalPage || totalPage < 1) {
    _paginationNext.disabled = true;
  } else {
    _paginationNext.disabled = false;
  }

  if (totalPage == 1) return;

  _paginationLinks.innerHTML = "";

  if (totalPage < 7) {
    renderPaginationNumbers(1, totalPage);
  } else {
    const maxGap = 4; // for desktop use 6
    const frontGap = page + 1;
    const inc = 1; // for desktop use 2

    if (frontGap >= maxGap) {
      renderPaginationNumbers(1, 1);
      _paginationLinks.innerHTML += `
			  <div class="pagination-numbers">
			  ...
			  </div>
		  `;
      renderPaginationNumbers(page - inc, Math.min(page + inc, totalPage));
    } else {
      renderPaginationNumbers(1, page + inc);
    }
    _paginationLinks.innerHTML += `
		  <div class="pagination-numbers">
		  ...
		  </div>
	  `;
    renderPaginationNumbers(totalPage, totalPage);
  }
};

const handlePageChange = async () => {
  await fetchDataAndRenderTable();
  navigateSilently();
};

export { renderPaginationNumbers, resetPagination, handlePageChange };
