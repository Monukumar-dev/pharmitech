import React from "react";
import './style.scss';

const Checkbox = ({ name, label, checked, labelClassName, onChange, disabled }) => {

  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };

  return (
    <label className={`custom-checkbox ${labelClassName} ${disabled?"check-disabled":""}`}>
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={handleChange}
        disabled={disabled} 
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
