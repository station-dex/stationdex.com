const formatAddress = (str: string) => {
  return str.substring(0, 6) + "..." + str.substring(str.length - 6);
};

const formatNumber = (val: string | number) => {
  if (typeof val === "string") val = parseFloat(val);
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const etherAddressBasicValidate = (value: string) => {
  if (typeof value !== "string") {
    return false;
  }
  if(!value) return true;
  if(!value.startsWith('0x')) return false;
  if(value.length < 5) return false;
  return true;
};

const handleCopyText = (targetButton: HTMLButtonElement) => {
  const text = targetButton.dataset.text;
  if (!text) return;

  if ("clipboard" in navigator) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        targetButton.dataset.state = "copied";
        setTimeout(() => {
          targetButton.dataset.state = "idle";
        }, 1500);
      })
      .catch((err) => console.error("Error copying text", err));
  } else {
    console.error("Copy text is not supported in this browser");
  }
};

export { formatAddress, handleCopyText, etherAddressBasicValidate, formatNumber };
