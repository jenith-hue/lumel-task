import React, { useState } from "react";

import { initialData } from "../shared/constants";
import TableRow from "./tableRow";

const HierarchicalTable = () => {
  const [data, setData] = useState(initialData);

  const distributer = (parent, newValue) => {
    if (!parent.children) return parent;
    
    const total = parent.children.reduce((sum, child) => sum + child.value, 0);
    if (total === 0) return { ...parent, value: newValue };
    
    const updatedChildren = parent.children.map((child) => ({
      ...child,
      value: parseFloat(((child.value / total) * newValue).toFixed(2)),
    }));
    
    return { ...parent, value: newValue, children: updatedChildren };
  };

  const parentTotalUpdater = (items) => {
    return items.map((item) => {
      if (item.children) {
        const updatedChildren = parentTotalUpdater(item.children);
        const newTotal = updatedChildren.reduce((sum, child) => sum + child.value, 0);
        return { ...item, value: newTotal, children: updatedChildren };
      }
      return item;
    });
  };

  const updateValue = (id, newValue) => {
    const recursiveUpdater = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          if (item.children) {
            return distributer(item, newValue);
          }
          return { ...item, value: newValue };
        }
        if (item.children) {
          return { ...item, children: recursiveUpdater(item.children) };
        }
        return item;
      });
    };

    let updatedData = recursiveUpdater(data);
    updatedData = parentTotalUpdater(updatedData);
    setData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow row={row} updateValue={updateValue} />
            {row.children &&
              row.children.map((child) => (
                <TableRow
                  key={child.id}
                  row={child}
                  updateValue={updateValue}
                />
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default HierarchicalTable;
