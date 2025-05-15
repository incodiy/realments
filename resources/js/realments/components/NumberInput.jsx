import React, { useState } from 'react';

function NumberInput(props) {
  const { name, label, placeholder, value, add, max, errors, classes } = props;
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

  if (add) {
    return (
      <div className="mb-4">
        {values.map((val, idx) => (
          <div key={idx} className="mb-2">
            {label && <label className={classes.label}>{label}</label>}
            <input
              type="number"
              name={`${name}[]`}
              value={val}
              placeholder={placeholder}
              className={classes.input}
              onChange={(e) => handleChange(idx, e)}
            />
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
      <input
        type="number"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className={classes.input}
      />
      {errors[name] && (
        <div className={classes.error}>{errors[name][0]}</div>
      )}
    </div>
  );
}

export default NumberInput;
