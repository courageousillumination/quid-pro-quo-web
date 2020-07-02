import React, { useState, useCallback, useEffect } from "react";

interface ComboSliderProps {
  min: number;
  max: number;
  onValueChange?: (newValue: number) => void;
}
/**
 * Controlled combo slider + input
 */
const ComboSlider: React.FC<ComboSliderProps> = ({
  min,
  max,
  onValueChange,
}) => {
  const [value, setValue] = useState(min);

  const setValueInRange = useCallback(
    (newValue) => {
      setValue(Math.max(Math.min(parseInt(newValue, 10), max), min));
    },
    [setValue, max, min]
  );

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValueInRange(e.target.value)}
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValueInRange(e.target.value)}
      />
    </>
  );
};

export default ComboSlider;
