import { writable } from "svelte/store";
import { getConfig } from "../utils/getConfig";

export const configStore = writable(getConfig());
