/**
 * Parses a query parameter into an array of strings
 * @param param - parameter from req.query (can be string, string[], or undefined)
 * @param separator - separator for strings (default ',')
 * @returns array of strings or undefined
 */
export function parseArrayParam(
  param: unknown,
  separator: string = ','
): string[] | undefined {
  if (Array.isArray(param)) {
    return param.filter((item) => typeof item === 'string' && item.length > 0);
  }

  if (typeof param === 'string' && param.length > 0) {
    return param
      .split(separator)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return undefined;
}

/**
 * Parses a query parameter into an array of numbers
 * @param param - parameter from req.query (can be string, string[], or undefined)
 * @param separator - separator for strings (default ',')
 * @returns array of positive numbers or undefined
 */
export function parseNumberArrayParam(
  param: unknown,
  separator: string = ','
): number[] | undefined {
  let items: string[] = [];

  if (Array.isArray(param)) {
    items = param.filter((item) => typeof item === 'string');
  } else if (typeof param === 'string' && param.length > 0) {
    items = param.split(separator);
  }

  if (items.length === 0) {
    return undefined;
  }

  const numbers = items
    .map((item) => parseInt(item.trim(), 10))
    .filter((num) => Number.isInteger(num) && num > 0);

  return numbers.length > 0 ? numbers : undefined;
}
