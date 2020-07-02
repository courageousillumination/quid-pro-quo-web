import React, { useState, useCallback } from "react";
import ComboSlider from "../components/combo-slider";
import Checkbox from "../components/checkbox";
import { API_ROOT } from "../constants/api";

const IMAGES = {
  "2beamsplitter_noobject_combined": require("../static/images/2beamsplitter_noobject_combined.png"),
  "2beamsplitter_object_combined": require("../static/images/2beamsplitter_object_combined.png"),
  "3beamsplitter_noobject_combined": require("../static/images/3beamsplitter_noobject_combined.png"),
  "3beamsplitter_object_combined": require("../static/images/3beamsplitter_object_combined.png"),
  "4beamsplitter_noobject_combined": require("../static/images/4beamsplitter_noobject_combined.png"),
  "4beamsplitter_object_combined": require("../static/images/4beamsplitter_object_combined.png"),
  "5beamsplitter_noobject_combined": require("../static/images/5beamsplitter_noobject_combined.png"),
  "5beamsplitter_object_combined": require("../static/images/5beamsplitter_object_combined.png"),
  Nbeamsplitter_noobject_combined: require("../static/images/Nbeamsplitter_noobject_combined.png"),
  Nbeamsplitter_object_combined: require("../static/images/Nbeamsplitter_object_combined.png"),
} as any;

interface SimulationResults {
  counts: { [key: string]: number };
  ntrans: number;
  pct: number;
  predict: number;
}

const getImageUrl = (nPhotons: number, hasObject: boolean) => {
  const n = nPhotons < 2 ? "2" : nPhotons < 6 ? nPhotons : "N";
  return IMAGES[
    `${n}beamsplitter_${hasObject ? "object" : "noobject"}_combined`
  ];
};

const QuantumZeno: React.FC = () => {
  const [nPhotons, setNPhotons] = useState<number>(0);
  const [n, setN] = useState<number>(0);
  const [hasObject, setHasObject] = useState<boolean>(false);
  const [runningSimulation, setRunningSimulation] = useState<boolean>(false);
  const [simulationResults, setSimulationResults] = useState<
    SimulationResults
  >();

  const runSimulation = useCallback(async () => {
    setRunningSimulation(true);
    const url = new URL(`${API_ROOT}/quantum-zeno`);
    url.search = new URLSearchParams({
      nPhotons: nPhotons.toString(),
      n: n.toString(),
      hasObject: hasObject ? "1" : "0",
    }).toString();
    const response = await fetch(url.toString());
    const data = await response.json();
    setSimulationResults(data);
    setRunningSimulation(false);
  }, [nPhotons, n, hasObject, setSimulationResults, setRunningSimulation]);

  return (
    <div>
      <label>Number of photons</label>
      <ComboSlider min={2} max={100} onValueChange={setNPhotons} />
      <label>N</label>
      <ComboSlider min={10} max={100} onValueChange={setN} />
      <label>Object?</label>
      <Checkbox onValueChange={setHasObject} />
      <button onClick={runSimulation} disabled={runningSimulation}>
        Do the thing!
      </button>
      <img
        src={getImageUrl(nPhotons, hasObject)}
        alt={`${nPhotons} Photons ${
          hasObject ? "with object" : "without object"
        }`}
      />
      {runningSimulation ? (
        <div>Running simulation...</div>
      ) : (
        <div>
          {simulationResults ? JSON.stringify(simulationResults) : null}
        </div>
      )}
    </div>
  );
};

export default QuantumZeno;
