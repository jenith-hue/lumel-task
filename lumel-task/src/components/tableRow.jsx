import React, { useState } from "react";

const TableRow = ({ row, updateValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const variance = row.originalValue
    ? (((row.value - row.originalValue) / row.originalValue) * 100).toFixed(2)
    : "0.00";

  const handlePercentageClick = () => {
    if (!inputValue) {
      setError("Enter either % or value against the row");
      return;
    }
    if (parseFloat(inputValue) < 0) {
      setError("Negative values are not allowed");
      return;
    }
    setError("");
    const newValue = row.value + (row.value * parseFloat(inputValue)) / 100;
    updateValue(row.id, newValue);
  };

  const handleValueClick = () => {
    if (!inputValue) {
      setError("Enter either % or value against the row");
      return;
    }
    if (parseFloat(inputValue) < 0) {
      setError("Negative values are not allowed");
      return;
    }
    setError("");
    const newValue = parseFloat(inputValue);
    updateValue(row.id, newValue);
  };

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{Number(row.value).toFixed(2)}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
        <td>
          <button onClick={handlePercentageClick}>Allocate %</button>
        </td>
        <td>
          <button onClick={handleValueClick}>Allocate Val</button>
        </td>
        <td>{variance}%</td>
      </tr>
      {error && (
        <tr>
          <td colSpan="6" className="error-message">
            {error}
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;