import React, { useState } from 'react';
import { ReactTextMaker } from 'react-text-maker';

import { APP } from './app';
import './style.css';


export default function Examples() {
  return (
    <div>
      <h2>Basic Usage</h2>
      <div className="demo">
        <APP />
      </div>

      <h2>With Callbacks</h2>
      <div className="demo">
        <CallbackExample />
      </div>

      <h2>Custom Theme</h2>
      <div className="demo">
        <ThemeExample />
      </div>

      <h2>Nested Highlights</h2>
      <div className="demo">
        <NestedExample />
      </div>

      <h2>Maximum Count Limit</h2>
      <div className="demo">
        <MaxCountExample />
      </div>
    </div>
  );
}

function CallbackExample() {
  const [highlights, setHighlights] = useState<any[]>([]);

  return (
    <div>
      <ReactTextMaker
        text="This is an example with callback functions. Try selecting text to create highlights, or click on existing highlights."
        hint="Note"
        onChange={setHighlights}
        onMarkClick={(ids) => console.log('Clicked highlights:', ids)}
        onMarkAdd={(item) => console.log('Added highlight:', item)}
        onMarkRemove={(items) => {
          console.log('Removed highlights:', items);
          return true;
        }}
      />
      <div className="mt-4">
        <p>Current highlight count: {highlights.length}</p>
      </div>
    </div>
  );
}

function ThemeExample() {
  const theme = [
    { hint: 'Important', color: '#ff0000' },
    { hint: 'Note', color: '#00ff00' },
    { hint: 'Reference', color: '#0000ff' }
  ];

  const [currentHint, setCurrentHint] = useState('Important');

  return (
    <div>
      <div className="mb-4">
        {theme.map(({ hint }) => (
          <button
            key={hint}
            onClick={() => setCurrentHint(hint)}
            className={`mr-2 px-3 py-1 rounded ${
              currentHint === hint ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {hint}
          </button>
        ))}
      </div>
      <ReactTextMaker
        text="This is an example with custom themes. You can switch between different hint types to create highlights with different colors."
        hint={currentHint}
        theme={theme}
      />
    </div>
  );
}

function NestedExample() {
  return (
    <ReactTextMaker
      text="This is an example supporting nested highlights. You can create new highlights on top of existing highlighted text."
      hint="Important"
      theme={[
        { hint: 'Important', color: 'rgba(255, 0, 0, 0.2)' },
        { hint: 'Note', color: 'rgba(0, 255, 0, 0.2)' }
      ]}
    />
  );
}

function MaxCountExample() {
  return (
    <ReactTextMaker
      text="This is an example with a maximum highlight count limit. You can only create up to 3 highlights."
      hint="Important"
      maxCount={3}
    />
  );
} 