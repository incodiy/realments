import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectInput from './components/SelectInput';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('realmentsTest');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <SelectInput
        name="kategori"
        label="Kategori"
        add={true}
        max={5}
        options={['elektronik', 'fashion', 'makanan']}
        classes={{
          label: 'block text-sm font-medium mb-1',
          input: 'border border-gray-300 p-2 rounded w-full',
          button: 'bg-blue-500 text-white px-3 py-1 rounded'
        }}
        errors={{}}
      />
    );
  }
});
