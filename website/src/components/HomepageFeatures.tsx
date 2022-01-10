import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "360 overview",
    description: (
      <>
        Excellent overview of how a room or area is and how equipment is placed.
      </>
    ),
  },
  {
    title: "Metrics",
    description: <>Visualize metrics in a 360 image.</>,
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <img src="./gif/360-viewer-office.gif" alt="360 showcase" />
      </div>
    </section>
  );
}
