const _tableBody = document.querySelector("#explorer-table-body");
import { DateLib } from "@/util/date.js";
import { formatAddress } from "./utils";

const buildTableBody = (data: any[]) => {
	if (!_tableBody) return;
	_tableBody.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
	  const el = data[i];
	  const unix = DateLib.toUnix(new Date(el.date))
	  _tableBody.innerHTML += `
		<tr>
			<td class='transactionHash link'>
				${el.transactionHash.substring(0, 26) + "..."}
			</td>
  
			<td class='chainId'>
				<div class='box'>
				  <i data-tooltip='X Layer Mainnet' data-type='196'></i>
			  </div>
			</td>
  
			<td class='date'>
				<span data-tooltip='${DateLib.fromUnix(unix).toString()}'>
				  ${DateLib.relativeTime(unix)}
			  </span>
			</td>
  
			<td class='eventName'>
			  <div class='badge gray'>${el.eventName}</div>  
			</td>
  
			<td class='transactionSender link'>
			  <div class='box'>
				  <span data-tooltip='${el.transactionSender}'>${formatAddress(el.transactionSender)}</span>
				  <button data-text='${el.transactionSender}' data-state='idle' data-type='copy'>
					  <i></i>
				  </button>
			  </div>
			</td>
  
			<td  class='contract link'>
			  <div class='box'>
				  <span data-flow='left' data-tooltip='${el.contract}'>${formatAddress(el.contract)}</span>
				  <button data-text='${el.contract}' data-state='idle' data-type='copy'>
					  <i></i>
				  </button>
			  </div>
			</td>
  
			<td class='blockNumber link'>
				${el.blockNumber}
			</td>
		  </tr>
		`;
	}
  };

const setTableLoading = () => {
  if (!_tableBody) return;
  _tableBody.classList.add("shimmer");
};

const removeTableLoading = () => {
  if (!_tableBody) return;
  _tableBody.classList.remove("shimmer");
};

export { buildTableBody, setTableLoading, removeTableLoading };