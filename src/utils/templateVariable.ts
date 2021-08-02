import { get, writable } from "svelte/store";
import { currentSceneKeyStore } from "../stores";

export const getTemplateVariable = (variable: string): string =>
  getTemplateSrv().replace(`$${variable}`);

export const updateTemplateVariable = (variable: string, value: string): void =>
  getLocationSrv().update({
    query: {
      [`var-${variable}`]: value,
    },
    partial: true,
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTemplateVariableStore = <B extends boolean>(
  variable: string,
  number: B
) => {
  function getValue(): B extends true ? number : string;
  function getValue(): number | string {
    const value = getTemplateVariable(variable);
    return number ? Number(value) : value;
  }

  const setVariable = (value: string | number): void =>
    updateTemplateVariable(variable, String(value));

  const updateVariable = () => {
    const currentKey = getValue();
    if (currentKey != get(currentSceneKeyStore)) set(currentKey);
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
