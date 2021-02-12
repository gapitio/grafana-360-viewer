function createSeries(name: string, value: number, refId = "A"): DataFrame {
  return {
    name: name,
    fields: [
      {
        name: "Time",
        type: "time",
        config: {},
        values: {
          length: 0,
          get: (index) => {
            return [][index];
          },
          toArray: () => [],
        },
        state: {
          displayName: null,
          scopedVars: {},
        },
      },
      {
        name: "Value",
        type: "number",
        config: {},
        values: {
          length: 0,
          get: (index) => {
            return [][index];
          },
          toArray: () => [],
        },
        state: {
          displayName: null,
          scopedVars: {},
          calcs: {
            allIsNull: false,
            allIsZero: false,
            count: 1,
            delta: value,
            diff: value,
            first: value,
            firstNotNull: value,
            last: value,
            lastNotNull: value,
            logmin: value,
            max: value,
            mean: value,
            min: 0,
            nonNullCount: 1,
            previousDeltaUp: true,
            range: value,
            step: value,
            sum: value,
          },
        },
      },
    ],
    length: 1,
    refId: refId,
    meta: undefined,
  };
}

export default createSeries;
