interface GrafanaTheme {
  isDark: boolean;
  isLight: boolean;
}

/**
 * Grafana theme.
 * Here you can get the current theme, colors, sizes, ETC.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
 */
declare const theme: GrafanaTheme;
