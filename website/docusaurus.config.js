const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Grafana 360 viewer",
    tagline: "360 viewer to visualize metrics in Grafana",
    url: "https://grafana-360-viewer.gapit.io/",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "favicon.ico",
    organizationName: "gapitio", // Usually your GitHub org/user name.
    projectName: "grafana-360-viewer", // Usually your repo name.
    trailingSlash: true,
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl:
              "https://github.com/gapitio/grafana-360-viewer/edit/main/website/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "Grafana 360 viewer",
          logo: {
            alt: "Grafana 360 viewer",
            src: "img/logo.svg",
          },
          items: [
            {
              type: "doc",
              docId: "introduction",
              position: "left",
              label: "Docs",
            },
            {
              href: "https://github.com/gapitio/grafana-360-viewer",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Help",
              items: [
                {
                  label: "Ask a question",
                  href: "https://github.com/gapitio/grafana-360-viewer/discussions/categories/q-a",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/gapitio/grafana-360-viewer",
                },
                {
                  label: "Discussions",
                  href: "https://github.com/gapitio/grafana-360-viewer/discussions",
                },
                {
                  label: "Issues",
                  href: "https://github.com/gapitio/grafana-360-viewer/issues",
                },
                {
                  label: "Contribute",
                  href: "https://github.com/gapitio/grafana-360-viewer/pulls",
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Gapit AS`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
