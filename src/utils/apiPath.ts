export const getFullAPIPath = (api: string): string => {
  const url = new URL(api, window.location.origin);
  return url.href;
};
