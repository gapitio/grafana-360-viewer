export const getFullAPIPath = (): string => {
  const url = new URL(customProperties.database.api, window.location.origin);
  return url.href;
};

export const getFileURL = (id: number): string =>
  `${getFullAPIPath()}file/${id}`;
