import { writable } from "svelte/store";

export const getTemplateVariable = (variable: string): string =>
  getTemplateSrv().replace(`${variable}`);

export const updateTemplateVariable = (
  variableName: string,
  value: string
): void =>
  getLocationSrv().update({
    query: {
      [`var-${variableName}`]: value,
    },
    partial: true,
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTemplateVariableStore = <B extends boolean>(
  variable: string,
  number: B
) => {
  const variableName = variable.replace(/[${}]/g, "");

  function getValue(): B extends true ? number : string;
  function getValue(): number | string {
    const value = getTemplateVariable(variable);
    return number ? Number(value) : value;
  }

  const setVariable = (value: string | number): void =>
    updateTemplateVariable(variableName, String(value));

  const updateVariable = (currentValue: B extends true ? number : string) => {
    const currentKey = getValue();
    if (currentKey != currentValue) set(currentKey);
  };

  const { set, subscribe, update } = writable(getValue());

  return {
    set,
    subscribe,
    update,
    setVariable,
    updateVariable,
  };
};
