const getHashFromTitle = (title: string) => {
  return title
    .toLowerCase()                      // Convert to lower case
    .replace(/[\W_]+/g, '_')            // Replace all non-word characters and underscores with a single underscore
    .replace(/^_+|_+$/g, '');           // Remove leading and trailing underscores
};

export { getHashFromTitle };