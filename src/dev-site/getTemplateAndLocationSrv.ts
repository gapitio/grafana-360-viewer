import { updateData } from "./data";

/* eslint-disable @typescript-eslint/no-explicit-any */
window.getTemplateSrv = (): TemplateSrv => ({
  getVariables: (): VariableModel[] => window.templateVariableList,
  replace: (target): string =>
    window.templateVariableList.find(
      (variable) => "$" + variable.name == target
    ).current.value,
});

window.getLocationSrv = (): LocationSrv => ({
  update: (options: LocationUpdate): void => {
    if (!options.query) {
      console.warn("Missing query option", options);
      return;
    }

    Object.entries(options.query).map(([variableName, value]) => {
      const variable = window.templateVariableList.find(
        (variable) => "var-" + variable.name == variableName
      );

      if (!variable) {
        console.warn("Could not find variable", options);
        return;
      }

      const currentlySelectedVariable = variable.options.find(
        (options) => options.selected
      );
      if (currentlySelectedVariable) currentlySelectedVariable.selected = false;

      const selectedVariable = variable.options.find(
        (options) => options.value == String(value)
      );
      if (selectedVariable) selectedVariable.selected = true;

      variable.current.value = String(value);
    });

    updateData(false, false);
    const panelUpdateEvent = new CustomEvent("panelupdate");
    htmlNode.dispatchEvent(panelUpdateEvent);
    htmlNode.onpanelupdate();
  },
});
