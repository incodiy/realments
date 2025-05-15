import React, { useState } from 'react';

function SelectInput(props) {
  const { name, label, options, value, add, max, errors, classes } = props;
  const [values, setValues] = useState(add ? value : [value || '']);

  const handleAdd = () => {
    if (!max || values.length < max) {
      setValues([...values, '']);
    }
  };
  const handleChange = (index, e) => {
    const newVals = [...values];
    newVals[index] = e.target.value;
    setValues(newVals);
  };

  // Render options in select
  const renderOptions = () =>
    options.map((opt, idx) => {
      if (typeof opt === 'object') {
        return (
          <option key={idx} value={opt.value}>{opt.label}</option>
        );
      }
      return (
        <option key={idx} value={opt}>{opt}</option>
      );
    });

  if (add) {
    return (
      <div className="mb-4">
        {values.map((val, idx) => (
          <div key={idx} className="mb-2">
            {label && <label className={classes.label}>{label}</label>}
            <select
              name={`${name}[]`}
              value={val}
              className={classes.input}
              onChange={(e) => handleChange(idx, e)}
            >
              <option value="">-- Select --</option>
              {renderOptions()}
            </select>
            {errors[name] && (
              <div className={classes.error}>{errors[name][0]}</div>
            )}
          </div>
        ))}
        <button
          type="button"
          className={classes.button}
          onClick={handleAdd}
        >
          Add {label || name}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {label && <label className={classes.label}>{label}</label>}
      <select
        name={name}
        defaultValue={value}
        className={classes.input}
      >
        <option value="">-- Select --</option>
        {renderOptions()}
      </select>
      {errors[name] && (
        <div className={classes.error}>{errors[name][0]}</div>
      )}
    </div>
  );
}

export default SelectInput;
