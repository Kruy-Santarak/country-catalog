export const paginated = () => {};

export const sort = (items = [], key, asc = true) => {
  const sortedItems = items.sort((a, b) => {
    let firstItem = ("" + a[key]).toLowerCase();
    let secondItem = ("" + b[key]).toLowerCase();

    return firstItem < secondItem ? -1 : firstItem > secondItem ? 1 : 0;
  });

  return asc ? sortedItems : sortedItems.reverse();
};

export const fuzzySearch = (items, key) => {
  return (query) => {
    const searchStrings = query.toLowerCase().split(" ");

    return items.filter((item) => {
      const normalizedTerm = item[key].toLowerCase();
      return searchStrings.every(
        (string) => normalizedTerm.indexOf(string) > -1
      );
    });
  };
};
