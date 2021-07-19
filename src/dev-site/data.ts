import { createSeries, createJSONDataSeries } from "./create-series";
import office360image from "../../public/office-360.jpg";
import earth360image from "../../public/earth.jpg";

const url = new URL(window.location.href);
const currentArea = url.searchParams.get("currentArea");
const autoRotate = url.searchParams.get("autoRotate");

function randomValue({ min = 0, max = 1 }): number {
  return Math.random() * (max - min) + min;
}

function updateTemplateVariableList(isFirstArea: boolean) {
  window.templateVariableList = isFirstArea
    ? [
        {
          id: "area",
          name: "area",
          label: null,
          type: "query",
          current: {
            value: "1",
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
              text: "4",
              value: "4",
              selected: true,
            },
            {
              text: "5",
              value: "5",
              selected: false,
            },
          ],
          current: {
            value: "1",
          },
        },
      ]
    : ([
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
              selected: false,
            },
            {
              text: "2",
              value: "2",
              selected: true,
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
              text: "3",
              value: "3",
              selected: true,
            },
          ],
          current: {
            value: "3",
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any);

  window.templateVariableList = [
    ...window.templateVariableList,
    autoRotate == "False"
      ? {
          id: "autoRotate",
          name: "autoRotate",
          label: null,
          type: "query",
          options: [
            {
              text: "True",
              value: "True",
              selected: false,
            },
            {
              text: "False",
              value: "False",
              selected: true,
            },
          ],
          current: {
            value: "False",
          },
        }
      : {
          id: "autoRotate",
          name: "autoRotate",
          label: null,
          type: "query",
          options: [
            {
              text: "True",
              value: "True",
              selected: true,
            },
            {
              text: "False",
              value: "False",
              selected: false,
            },
          ],
          current: {
            value: "True",
          },
        },
  ];
}

function updateData(shouldUpdateVariables = true, randomArea = true): void {
  if (randomArea) {
    window.isFirstArea = currentArea == "first" || Math.random() > 0.5;
  }

  if (shouldUpdateVariables) updateTemplateVariableList(window.isFirstArea);

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
      createJSONDataSeries(
        "scenes",
        window.isFirstArea
          ? [
              JSON.stringify([
                {
                  scene_key: 1,
                  area_key: 1,
                  scene_name: "Something",
                  facing_yaw: 0,
                  facing_pitch: 0,
                  fov: 100,
                },
                {
                  scene_key: 2,
                  area_key: 1,
                  scene_name: "Something else",
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 4,
                  area_key: 1,
                  scene_name: "Office",
                  image: office360image,
                  facing_yaw: 0,
                  facing_pitch: 0,
                  fov: 100,
                },
                {
                  scene_key: 5,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 6,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 7,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 8,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 9,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 10,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 11,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 12,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
                {
                  scene_key: 13,
                  area_key: 1,
                  scene_name: "Earth",
                  image: earth360image,
                  facing_yaw: 1,
                  facing_pitch: 0,
                  fov: 120,
                },
              ]),
            ]
          : [
              JSON.stringify([
                {
                  scene_key: 3,
                  area_key: 2,
                  scene_name: "An earth image",
                  image: earth360image,
                  facing_yaw: 0,
                  facing_pitch: 0,
                  fov: 100,
                },
              ]),
            ]
      ),
      createJSONDataSeries(
        "hotspots",
        window.isFirstArea
          ? [
              JSON.stringify([
                {
                  area_key: 1,
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
                  extra_transforms: "",
                  link: "/a",
                },
                {
                  area_key: 1,
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
                  extra_transforms: "",
                },
                {
                  area_key: 1,
                  hotspot_key: 3,
                  scene_key: 2,
                  type: "metric",
                  title: "Title thing",
                  description: "",
                  metric: "b-d-c",
                  unit: "kW",
                  color: "#531BBA",
                  go_to_scene_key: 1,
                  yaw: 0.9,
                  pitch: 0,
                  extra_transforms: "",
                },
                {
                  area_key: 1,
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
                  extra_transforms: "",
                },
                {
                  area_key: 3,
                  hotspot_key: 5,
                  scene_key: 2,
                  type: "scene",
                  title: "A title text, again",
                  description: "",
                  metric: "a-d-c",
                  unit: "kW",
                  color: "#531AAA",
                  go_to_scene_key: 1,
                  yaw: 1.5,
                  pitch: 0,
                  extra_transforms: "",
                },
                {
                  area_key: 3,
                  hotspot_key: 6,
                  scene_key: 1,
                  type: "scene",
                  title: "Go to next scene",
                  description: "",
                  metric: "a-d-c",
                  unit: "kW",
                  color: "#531AAA",
                  go_to_scene_key: 2,
                  yaw: 1.5,
                  pitch: 0,
                  extra_transforms: "",
                },
              ]),
            ]
          : [
              JSON.stringify([
                {
                  area_key: 3,
                  hotspot_key: 6,
                  scene_key: 3,
                  type: "metric",
                  title: "This is something",
                  description: "",
                  metric: "a-f-g",
                  unit: "kW",
                  color: "#24A214",
                  go_to_scene_key: 2,
                  yaw: -0.2,
                  pitch: 0,
                  extra_transforms: "",
                },
              ]),
            ]
      ),
    ],
  };
}

export { updateData };
