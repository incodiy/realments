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
      ...field,
    };

    // Normalize addable prop for frontend use
    const normalizedField = {
      ...commonProps,
      add: field.addable ?? field.add ?? false,
    };

    switch (field.type) {
      case 'text':
        return <TextInput {...normalizedField} />;
      case 'email':
        return <EmailInput {...normalizedField} />;
      case 'password':
        return <PasswordInput {...normalizedField} />;
      case 'number':
        return <NumberInput {...normalizedField} />;
      case 'date':
        return <DateInput {...normalizedField} />;
      case 'textarea':
        return <TextareaInput {...normalizedField} />;
      case 'select':
        return <SelectInput {...normalizedField} />;
      case 'file':
        return <FileInput {...normalizedField} />;
      case 'checkbox':
        return <CheckboxInput {...normalizedField} />;
      case 'radio':
        return <RadioInput {...normalizedField} />;
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
