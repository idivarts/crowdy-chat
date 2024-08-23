export const convertObjectToUrlQuery = (input: {
  [k: string]: any;
}): string => {
  if (Object.keys(input).length === 0) {
    return "";
  }

  const queryParams = [];

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      if (input[key] == undefined) {
        continue;
      }
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(input[key]);
      queryParams.push(`${encodedKey}=${encodedValue}`);
    }
  }

  if (queryParams.length == 0) return "";

  return "?" + queryParams.join("&");
};
