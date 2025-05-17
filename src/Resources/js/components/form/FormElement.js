import React from 'react';
import { useTranslation } from 'react-i18next';

// Import form elements
import FormOpen from './elements/FormOpen';
import FormClose from './elements/FormClose';
import SelectElement from './elements/SelectElement';
import TextElement from './elements/TextElement';
import TextareaElement from './elements/TextareaElement';
import CheckboxElement from './elements/CheckboxElement';
import RadioElement from './elements/RadioElement';
import SwitchElement from './elements/SwitchElement';
import PasswordElement from './elements/PasswordElement';
import EmailElement from './elements/EmailElement';
import NumberElement from './elements/NumberElement';
import DateElement from './elements/DateElement';
import TimeElement from './elements/TimeElement';
import DatetimeElement from './elements/DatetimeElement';
import DateRangeElement from './elements/DateRangeElement';
import FileElement from './elements/FileElement';
import HiddenElement from './elements/HiddenElement';
import RangeElement from './elements/RangeElement';
import ColorElement from './elements/ColorElement';
import TagsElement from './elements/TagsElement';
import RichTextElement from './elements/RichTextElement';
import CaptchaElement from './elements/CaptchaElement';
import AutocompleteElement from './elements/AutocompleteElement';
import ButtonElement from './elements/ButtonElement';

const FormElement = ({ element, errors, oldInput, cssFramework, themeMode }) => {
  const { t } = useTranslation();
  
  if (!element || !element.type) {
    return null;
  }
  
  // Get error message for this element if exists
  const errorMessage = errors && errors[element.name] ? errors[element.name][0] : null;
  
  // Get old input value if exists
  const oldValue = oldInput && oldInput[element.name] ? oldInput[element.name] : null;
  
  // Use old input value if available, otherwise use the element's value
  const value = oldValue !== null ? oldValue : element.value;
  
  // Common props for all elements
  const commonProps = {
    element,
    errorMessage,
    value,
    cssFramework,
    themeMode
  };
  
  // Render the appropriate element based on type
  switch (element.type) {
    case 'form_open':
      return <FormOpen {...commonProps} />;
    case 'form_close':
      return <FormClose {...commonProps} />;
    case 'select':
      return <SelectElement {...commonProps} />;
    case 'text':
      return <TextElement {...commonProps} />;
    case 'textarea':
      return <TextareaElement {...commonProps} />;
    case 'checkbox':
      return <CheckboxElement {...commonProps} />;
    case 'radio':
      return <RadioElement {...commonProps} />;
    case 'switch':
      return <SwitchElement {...commonProps} />;
    case 'password':
      return <PasswordElement {...commonProps} />;
    case 'email':
      return <EmailElement {...commonProps} />;
    case 'number':
      return <NumberElement {...commonProps} />;
    case 'date':
      return <DateElement {...commonProps} />;
    case 'time':
      return <TimeElement {...commonProps} />;
    case 'datetime':
      return <DatetimeElement {...commonProps} />;
    case 'daterange':
      return <DateRangeElement {...commonProps} />;
    case 'file':
      return <FileElement {...commonProps} />;
    case 'hidden':
      return <HiddenElement {...commonProps} />;
    case 'range':
      return <RangeElement {...commonProps} />;
    case 'color':
      return <ColorElement {...commonProps} />;
    case 'tags':
      return <TagsElement {...commonProps} />;
    case 'richtext':
      return <RichTextElement {...commonProps} />;
    case 'captcha':
      return <CaptchaElement {...commonProps} />;
    case 'autocomplete':
      return <AutocompleteElement {...commonProps} />;
    case 'button':
      return <ButtonElement {...commonProps} />;
    default:
      return <div>Unknown element type: {element.type}</div>;
  }
};

export default FormElement;
