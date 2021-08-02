export const getFullAPIPath = (api: string): string => {
  const r = new RegExp("^(?:[a-z]+:)?//", "i");
  const isRelativeURL = !r.test(api);

  const fullAPIPath = (isRelativeURL ? window.location.origin : "") + api;
  return fullAPIPath;
};
