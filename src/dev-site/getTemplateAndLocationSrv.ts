/* eslint-disable @typescript-eslint/no-explicit-any */
const variables = [
  {
    id: "area",
    name: "area",
    label: null,
    type: "query",
    current: {
      text: "2",
      value: "2",
      selected: false,
    },
    options: [
      {
        text: "1",
        value: "1",
        selected: true,
      },
      {
        text: "2",
        value: "2",
        selected: false,
      },
    ],
  },
  {
    id: "scene",
    name: "scene",
    label: null,
    type: "query",
    options: [
      {
        text: "1",
        value: "1",
        selected: true,
      },
      {
        text: "2",
        value: "2",
        selected: false,
      },
      {
        text: "3",
        value: "3",
        selected: false,
      },
    ],
    current: {
      value: "1",
    },
  },
] as any;

window.getTemplateSrv = (): TemplateSrv => ({
  getVariables: (): VariableModel[] => variables,
  replace: (target): string =>
    variables.find((variable) => "$" + variable.name == target).current.value,
});

window.getLocationSrv = (): LocationSrv => ({
  update: (options: LocationUpdate): void => {
    if (!options.query) {
      console.warn("Missing query option", options);
      return;
    }

    Object.entries(options.query).map(([variableName, value]) => {
      const variable = variables.find(
        (variable) => "var-" + variable.name == variableName
      );

      if (!variable) {
        console.warn("Could not find variable", options);
        return;
      }

      variable.options.find((options) => options.selected).selected = false;
      variable.options.find(
        (options) => options.value == String(value)
      ).selected = true;

      variable.options.find(
        (options) => options.value == String(value)
      ).selected = true;
      variable.current.value = String(value);
    });
  },
});
