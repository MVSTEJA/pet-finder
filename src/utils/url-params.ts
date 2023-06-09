/**
 * Returns param name from a URL.
 * @param {string} name
 */
export const getURLParams = (name: string): string => {
  return (
    new URLSearchParams(window.location.search).get(name)?.toString() || ''
  );
};

/**
 * sets query string and returns the value in a query string format.
 * @param {string} key
 * @param {string} value
 */
export const setURLParams = (
  paramName: string,
  value: string | number | boolean
) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(paramName, value.toString());
};

export const convertToArray = (str: string) => str.split(',');
