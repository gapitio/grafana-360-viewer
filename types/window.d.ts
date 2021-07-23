interface Window {
  htmlNode: typeof htmlNode;
  customProperties: typeof customProperties;
  data: typeof data;
  options: typeof options;
  theme: typeof theme;
  getTemplateSrv: typeof getTemplateSrv;
  getLocationSrv: typeof getLocationSrv;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateVariableList: any;
  isFirstArea: boolean;
}
