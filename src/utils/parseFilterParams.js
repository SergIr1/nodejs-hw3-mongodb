const parseFavourite = (value) => {
  if (typeof value === 'undefined') {
    return undefined;
  }

  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
};

const parseContactType = (value) => {
  const allowedTypes = ['personal', 'home'];

  if (typeof value === 'undefined') {
    return undefined;
  }

  if (allowedTypes.includes(value) !== true) {
    return undefined;
  }

  return value;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseContactType(type);

  // ============== Cпособ 1 ====================
  const filters = {};

  if (parsedFavourite !== undefined) {
    filters.isFavourite = parsedFavourite;
  }

  if (parsedContactType !== undefined) {
    filters.contactType = parsedContactType;
  }

  return filters;

  // ============== /Cпособ 1 ====================

  // ============== ИЛИ способ 2 ====================
  //   return {
  //     ...(parsedFavourite !== undefined && { isFavourite: parsedFavourite }),
  //     ...(parsedContactType !== undefined && { contactType: parsedContactType }),
  //   };
  // ============== /ИЛИ способ 2 ====================
};

// ============== ПАРСЮ ГОД ====================

// const parseYear = (value) => {
//   if (typeof value === 'undefined') {
//     return undefined;
//   }

//   const parsedYear = parseInt(value);

//   if (Number.isNaN(parsedYear) === true) {
//     return undefined;
//   }

//   return parsedYear;
// };

// export const parseFilterParams = (query) => {
//   const { minYear, maxYear } = query;

//   const parsedMinYear = parseYear(minYear);
//   const parsedMaxYear = parseYear(maxYear);

//   return {
//     minYear: parsedMinYear,
//     maxYear: parsedMaxYear,
//   };
// };
