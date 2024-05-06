const getHashFromTitle = (title: string) => {
  return title.toLowerCase().replace(/[^\w]/g, '_');
}

export {
  getHashFromTitle
}