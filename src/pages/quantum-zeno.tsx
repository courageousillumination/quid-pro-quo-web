import React, { useState, useCallback } from "react";
import ComboSlider from "../components/combo-slider";
import Checkbox from "../components/checkbox";
import { API_ROOT } from "../constants/api";

interface SimulationResults {
  counts: { [key: string]: number };
  ntrans: number;
  pct: number;
  predict: number;
}

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
      <ComboSlider min={0} max={100} onValueChange={setNPhotons} />
      <label>N</label>
      <ComboSlider min={0} max={100} onValueChange={setN} />
      <label>Object?</label>
      <Checkbox onValueChange={setHasObject} />
      <button onClick={runSimulation} disabled={runningSimulation}>
        Do the thing!
      </button>
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
