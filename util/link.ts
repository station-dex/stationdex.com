const getHashFromTitle = (title: string) => {
  return title.toLowerCase().replace(/\s/g, '_');
}

export {
  getHashFromTitle
}