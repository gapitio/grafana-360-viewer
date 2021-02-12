import customPropertiesJSON from "../../src/custom-properties.json";

declare global {
  const customProperties: typeof customPropertiesJSON;
}
