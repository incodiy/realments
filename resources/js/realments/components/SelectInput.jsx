import React, { useState } from 'react';

function SelectInput(props) {
  const {
    name,
    label,
    options = [],
    value,
    add,
    max,
    errors = {},
    classes = {},
  } = props;

  const initialValues = add ? (Array.isArray(value) ? value : [value || '']) : [value || ''];
  const [values, setValues] = useState(initialValues);

  const handleAdd = () => {
    if (!max || values.length < max) {
      setValues([...values, '']);
    }
  };

  const handleRemove = (index) => {
    const newVals = [...values];
    newVals.splice(index, 1);
    setValues(newVals);
  };

  const handleChange = (index, e) => {
    const newVals = [...values];
    newVals[index] = e.target.value;
    setValues(newVals);
  };

  const renderOptions = () =>
    options.map((opt, idx) => {
      if (typeof opt === 'object') {
        return (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        );
      }
      return (
        <option key={idx} value={opt}>
          {opt}
        </option>
      );
    });

  if (add) {
    return (
      <div className="mb-4">
        {values.map((val, idx) => (
          <div key={idx} className="mb-2 flex items-center gap-2">
            <div className="flex-1">
              {label && idx === 0 && <label className={classes.label}>{label}</label>}
              <select
                name={`${name}[]`}
                value={val}
                className={classes.input}
                onChange={(e) => handleChange(idx, e)}
              >
                <option value="">-- Select --</option>
                {renderOptions()}
              </select>
              {errors[name] && idx === 0 && (
                <div className={classes.error}>{errors[name][0]}</div>
              )}
            </div>
            {values.length > 1 && (
              <button
                type="button"
                className={`${classes.button} bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded`}
                onClick={() => handleRemove(idx)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {(!max || values.length < max) && (
          <button
            type="button"
            className={`${classes.button} mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded`}
            onClick={handleAdd}
          >
            Add {label || name}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {label && <label className={classes.label}>{label}</label>}
      <select name={name} defaultValue={value} className={classes.input}>
        <option value="">-- Select --</option>
        {renderOptions()}
      </select>
      {errors[name] && <div className={classes.error}>{errors[name][0]}</div>}
    </div>
  );
}

export default SelectInput;
