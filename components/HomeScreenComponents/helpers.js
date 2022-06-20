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
  ALPHA_ASC: 'Alphabetically (Asc)',
  ALPHA_DESC: 'Alphabetically (Desc)',
  ADDED_ASC: 'Date added (Earliest first)',
  ADDED_DESC: 'Date added (Latest first)',
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
      const dateA = moment(a.purchaseDate, 'DD-MM-YYYY').toDate();
      const dateB = moment(b.purchaseDate, 'DD-MM-YYYY').toDate();
      if (order === ASC) return dateA - dateB;
      return dateB - dateA;
    }
    case 'expiry': {
      const dateA = moment(a.expiryDate, 'DD-MM-YYYY').toDate();
      const dateB = moment(b.expiryDate, 'DD-MM-YYYY').toDate();
      if (order === ASC) return dateA - dateB;
      return dateB - dateA;
    }
    default: {
      return 0;
    }
  }
}
