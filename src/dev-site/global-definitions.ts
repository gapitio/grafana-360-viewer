/*
  Creates global variables used in on-init and on-render
*/

import customProperties from "../custom-properties.json";

window.customProperties = customProperties;
window.options = {
  add100Percentage: false,
  centerAlignContent: false,
  SVGBaseFix: false,
  css: "",
  html: "",
  onRender: "",
  onInit: "",
  customProperties: "",
};
