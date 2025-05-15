import React from 'react';

function CheckboxInput(props) {
  const { name, label, options, value, errors, classes } = props;

  // If multiple options (array of {value,label}), render multiple checkboxes
  if (options && options.length) {
    return (
      <div className="mb-4">
        {label && <label className={classes.label}>{label}</label>}
        {options.map((opt, idx) => (
          <div key={idx}>
            <label>
              <input
                type="checkbox"
                name={`${name}[]`}
                value={opt.value}
                defaultChecked={Array.isArray(value) && value.includes(opt.value)}
              />
              {' '}{opt.label}
            </label>
          </div>
        ))}
        {errors[name] && (
          <div className={classes.error}>{errors[name][0]}</div>
        )}
      </div>
    );
  }

  // Single checkbox
  return (
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          name={name}
          value="1"
          defaultChecked={!!value}
          className={classes.input}
        />
        <span className={classes.label}>{label}</span>
      </label>
      {errors[name] && (
        <div className={classes.error}>{errors[name][0]}</div>
      )}
    </div>
  );
}

export default CheckboxInput;
