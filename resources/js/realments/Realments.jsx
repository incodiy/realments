import React from 'react';
import TextInput from './components/TextInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import NumberInput from './components/NumberInput';
import DateInput from './components/DateInput';
import TextareaInput from './components/TextareaInput';
import SelectInput from './components/SelectInput';
import FileInput from './components/FileInput';
import CheckboxInput from './components/CheckboxInput';
import RadioInput from './components/RadioInput';

function Realments(props) {
  const { fields, action, method, errors, classes } = props;

  // Function to choose which component to render
  const renderField = (field, index) => {
    const commonProps = {
      key: index,
      errors: errors,
      classes: classes,
      ...field
    };
    switch (field.type) {
      case 'text':
        return <TextInput {...commonProps} />;
      case 'email':
        return <EmailInput {...commonProps} />;
      case 'password':
        return <PasswordInput {...commonProps} />;
      case 'number':
        return <NumberInput {...commonProps} />;
      case 'date':
        return <DateInput {...commonProps} />;
      case 'textarea':
        return <TextareaInput {...commonProps} />;
      case 'select':
        return <SelectInput {...commonProps} />;
      case 'file':
        return <FileInput {...commonProps} />;
      case 'checkbox':
        return <CheckboxInput {...commonProps} />;
      case 'radio':
        return <RadioInput {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <form action={action} method={method} encType="multipart/form-data">
      {fields.map((field, index) => renderField(field, index))}
      <div className="mt-4">
        <button type="submit" className={classes.button}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Realments;
