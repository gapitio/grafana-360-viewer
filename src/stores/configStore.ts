import { derived } from "svelte/store";
import { getConfig } from "../utils/getConfig";
import { dataStore } from "./dataStore";

export const configStore = derived(dataStore, () => getConfig());
