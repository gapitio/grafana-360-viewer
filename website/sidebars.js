/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting started",
      items: ["introduction", "setup"],
    },
    {
      type: "doc",
      id: "areas",
    },
    {
      type: "doc",
      id: "scenes",
    },
    {
      type: "doc",
      id: "hotspots",
    },
    {
      type: "doc",
      id: "custom-properties",
    },
    {
      type: "category",
      label: "Guides",
      items: [
        {
          type: "autogenerated",
          dirName: "guides",
        },
      ],
    },
  ],
};
