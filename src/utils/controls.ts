import { get } from "svelte/store";
import { currentEditableHotspotStore, viewerStore } from "~/stores";

export const handleHotspotEditing = (): void => {
  currentEditableHotspotStore.subscribe((currentEditableHotspot) => {
    const viewer = get(viewerStore);
    if (!viewer) return;
    console.log(currentEditableHotspot);

    if (currentEditableHotspot === null) viewer.controls().enable();
    else viewer.controls().disable();
  });
};
