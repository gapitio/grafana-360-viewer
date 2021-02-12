import createSeries from "./create-series";

function randomValue({ min = 0, max = 1 }): number {
  return Math.random() * (max - min) + min;
}

function updateData(): void {
  window.data = {
    state: "Done",
    series: [
      createSeries("random-series-1", randomValue({ min: 0, max: 100 })),
      createSeries("random-series-2", randomValue({ min: -100, max: 100 })),
    ],
  };
}

export { updateData };
