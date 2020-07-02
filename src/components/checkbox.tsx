import React, { useState, useEffect } from "react";

interface CheckboxProps {
  onValueChange?: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onValueChange }) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
    />
  );
};

export default Checkbox;
