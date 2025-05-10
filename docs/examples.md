# Examples

<Examples /> 

## Basic Code

```tsx
import React, { useState } from 'react';

import { ReactTextMaker, DEFAULT_THEME } from '../../src/ReactTextMaker';

const TEXT = `Premium Cotton Blend T-Shirt
Made in USA
95% Cotton, 5% Spandex
Machine Washable

FEATURES:
• Ultra-soft, breathable fabric for all-day comfort
• Athletic fit with stretch technology
• Moisture-wicking material keeps you cool and dry
• Reinforced stitching for enhanced durability

CARE INSTRUCTIONS:
• Wash cold with similar colors
• Tumble dry low
• Do not bleach
• Iron on low if needed

Available in sizes XS-XXL
Perfect for casual wear or active lifestyle
Satisfaction guaranteed or your money back`;
const hints = ['size', 'color', 'material', 'care', 'features'];


export const APP = () => {
  const [selectedHint, setSelectedHint] = useState(hints[0]);

  return (
    <>
    <div style={{ padding: '20px' }}>
      <ReactTextMaker text={TEXT} theme={hints.map((hint) => ({ hint }))} hint={selectedHint} />
    </div>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      padding: '20px',
    }}>
      {['size', 'color', 'material', 'care', 'features'].map((hint, index) => (
        <span
          key={hint}
          style={{
            width: '100px',
            backgroundColor: selectedHint === hint ? '#B8C3CE' : '#F8F9FA',
            borderLeft: `4px solid ${DEFAULT_THEME[index]}`,
            color: '#2C3E50',
            cursor: 'pointer',
            margin: '8px 0',
            padding: '6px 4px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            display: 'inline-block',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
          onClick={() => setSelectedHint(hint)}
        >
          {hint}
        </span>
      ))}
    </div>
    </>
  );
};
```