import React from 'react';

function FileInput(props) {
  const { name, label, errors, classes } = props;

  return (
    <div className="mb-4">
      {label && <label className={classes.label}>{label}</label>}
      <input
        type="file"
        name={name}
        className={classes.input}
      />
      {errors[name] && (
        <div className={classes.error}>{errors[name][0]}</div>
      )}
    </div>
  );
}

export default FileInput;
