import React from 'react';

function RadioInput(props) {
  const { name, label, options, value, errors, classes } = props;

  return (
    <div className="mb-4">
      {label && <label className={classes.label}>{label}</label>}
      {options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name={name}
              value={opt.value}
              defaultChecked={value === opt.value}
              className="mr-2"
            />
            {opt.label}
          </label>
        </div>
      ))}
      {errors[name] && (
        <div className={classes.error}>{errors[name][0]}</div>
      )}
    </div>
  );
}

export default RadioInput;
