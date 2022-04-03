/**
 *
 */
export const setItemToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

/**
 *
 */

export const getItemFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));
