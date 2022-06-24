import moment from 'moment';

export const STORAGE = {
  ALL: 'All',
  FRIDGE: 'Fridge',
  FREEZER: 'Freezer',
  PANTRY: 'Pantry',
};

export const SORT = {
  EXPIRY_ASC: 'Expiry (Earliest first)',
  EXPIRY_DESC: 'Expiry (Latest first)',
  ADDED_ASC: 'Date added (Earliest first)',
  ADDED_DESC: 'Date added (Latest first)',
  ALPHA_ASC: 'Alphabetically (Asc)',
  ALPHA_DESC: 'Alphabetically (Desc)',
};

export function sortItems(a, b, type, order) {
  const ASC = 'asc';
  switch (type) {
    case 'alpha': {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (order === ASC) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
      }
      return 0;
    }
    case 'added': {
      const dateA = a.purchaseDate;
      const dateB = b.purchaseDate;
      if (order === ASC) return moment(dateA).diff(dateB);
      return moment(dateB).diff(dateA);
    }
    case 'expiry': {
      const dateA = a.expiryDate;
      const dateB = b.expiryDate;
      if (order === ASC) return moment(dateA).diff(dateB);
      return moment(dateB).diff(dateA);
    }
    default: {
      return 0;
    }
  }
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
