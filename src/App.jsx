import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaClipboard } from 'react-icons/fa';
import { UseForm } from './UseFrom';
import { getRandomChar, getSpecialChar } from './utils';

function App() {
  const [values, setValues] = UseForm({
    length: 6,
    capital: true,
    small: true,
    number: false,
    symbol: false,
  });

  const [result, setResult] = useState('');

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar(),
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = '';
    const checkedFields = fieldsArray.filter(({ field }) => field);

    // agar koi option select nahi hai
    if (checkedFields.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    // agar length 4 se kam hai
    if (values.length < 4) {
      toast.error('Password length must be at least 4');
      return;
    }

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();
      if (letter) {
        generatedPassword += letter;
      }
    }

    setResult(generatedPassword);
    toast.success('Password generated successfully!');
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success('Copied to clipboard!');
    } else {
      toast.error('No password to copy');
    }
  };

  return (
    <section>
      <div className="container">
        <form id="pg-form" onSubmit={handleOnSubmit}>
          <div className="result">
            <input
              type="text"
              id="result"
              placeholder="Min 4 Char"
              readOnly
              value={result}
            />
            <div className="clipboard" onClick={handleClipboard}>
              <FaClipboard />
            </div>
          </div>
          <div>
            <div className="field">
              <label htmlFor="length">Length</label>
              <input
                type="number"
                id="length"
                min={4}
                max={20}
                name="length"
                value={values.length}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="capital">Capital</label>
              <input
                type="checkbox"
                id="capital"
                name="capital"
                checked={values.capital}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="small">Small</label>
              <input
                type="checkbox"
                id="small"
                name="small"
                checked={values.small}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="number">Number</label>
              <input
                type="checkbox"
                id="number"
                name="number"
                checked={values.number}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="symbol">Symbol</label>
              <input
                type="checkbox"
                id="symbol"
                name="symbol"
                checked={values.symbol}
                onChange={setValues}
              />
            </div>
          </div>
          <button type="submit">Generate Password</button>
        </form>
      </div>

      {/* Ye toaster hamesha page pe alert dikhayega */}
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}

export default App;
