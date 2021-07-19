import { createSeries, createJSONDataSeries } from "./create-series";
import office360image from "../../public/office-360.jpg";
import earth360image from "../../public/earth.jpg";

function randomValue({ min = 0, max = 1 }): number {
  return Math.random() * (max - min) + min;
}

function updateData(): void {
  window.data = {
    state: "Done",
    series: [
      createSeries("random-series-1", randomValue({ min: 0, max: 100 })),
      createSeries("random-series-2", randomValue({ min: -100, max: 100 })),
      createSeries("a-c-c", randomValue({ min: 0, max: 100 })),
      createJSONDataSeries("areas", [
        JSON.stringify([
          { area_key: 1, area_name: "Something" },
          { area_key: 2, area_name: "Hehe" },
          { area_key: 3, area_name: "Something" },
          { area_key: 4, area_name: "Hehe" },
        ]),
      ]),
      createJSONDataSeries("scenes", [
        JSON.stringify([
          {
            scene_key: 1,
            area_key: 1,
            scene_name: "Office",
            image: office360image,
            facing_yaw: 0,
            facing_pitch: 0,
            fov: 100,
          },
          {
            scene_key: 2,
            area_key: 1,
            scene_name: "Earth",
            image: earth360image,
            facing_yaw: 1,
            facing_pitch: 0,
            fov: 120,
          },
        ]),
      ]),
      createJSONDataSeries("hotspots", [
        JSON.stringify([
          {
            hotspot_key: 1,
            scene_key: 1,
            type: "metric",
            title: "A title text",
            description: "",
            metric: "a-c-c",
            unit: "kW",
            color: "#24A214",
            go_to_scene_key: 2,
            yaw: 0.3,
            pitch: 0,
            extra_transform: "",
          },
          {
            hotspot_key: 2,
            scene_key: 1,
            type: "metric",
            title: "A title text, again",
            description: "",
            metric: "a-d-c",
            unit: "kW",
            color: "#531AAA",
            go_to_scene_key: 2,
            yaw: 0.6,
            pitch: 0,
            extra_transform: "",
          },
          {
            hotspot_key: 3,
            scene_key: 3,
            type: "metric",
            title: "Title thing",
            description: "",
            metric: "b-d-c",
            unit: "kW",
            color: "#531BBA",
            go_to_scene_key: 1,
            yaw: 0.9,
            pitch: 0,
            extra_transform: "",
          },
          {
            hotspot_key: 4,
            scene_key: 1,
            type: "metric",
            title: "A title text",
            description: "",
            metric: "a-c-c",
            unit: "kW",
            color: "#24A214",
            go_to_scene_key: 2,
            yaw: 1.2,
            pitch: 0,
            extra_transform: "",
          },
          {
            hotspot_key: 5,
            scene_key: 1,
            type: "scene",
            title: "A title text, again",
            description: "",
            metric: "a-d-c",
            unit: "kW",
            color: "#531AAA",
            go_to_scene_key: 2,
            yaw: 1.5,
            pitch: 0,
            extra_transform: "",
          },
        ]),
      ]),
    ],
  };
}

export { updateData };
