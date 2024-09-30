import React from 'react';

interface inputData {
  inputName: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const TextInput = ({ inputName, value, onChange, label }: inputData) => {
  return (
    <div className="input__container">
      <label htmlFor={inputName} className="copy copy-small">{label}</label>
      <input
        type="text"
        className="input input__text input--beige"
        id={inputName}
        name={inputName}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextInput;
