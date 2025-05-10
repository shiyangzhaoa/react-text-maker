# API Reference

## ReactTextMaker

The main component for creating and managing text highlights and annotations.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | required | The text content to be highlighted |
| hint | string | required | The hint text for the current highlight |
| value | HighlightItem[] | [] | Array of highlight items |
| onChange | (items: HighlightItem[]) => void | - | Callback when highlights change |
| onMarkClick | (ids: string[]) => void | - | Callback when a highlight is clicked |
| onMarkAdd | (item: HighlightItem) => void | - | Callback when a highlight is added |
| onMarkRemove | (items: HighlightItem[]) => void \| boolean | - | Callback when highlights are removed |
| disabled | boolean | false | Whether the component is disabled |
| className | string | - | Custom CSS class name |
| style | React.CSSProperties | - | Custom inline styles |
| theme | (string \| { hint: string; color?: string })[] | DEFAULT_THEME | Array of highlight colors or theme objects |
| maxCount | number | - | Maximum number of highlights allowed |
| hintStyle | React.CSSProperties | - | Custom styles for hint text |

### HighlightItem Type

```typescript
interface HighlightItem {
  id: string;           // Unique identifier for the highlight
  text: string;         // The highlighted text content
  hint: string;         // The hint text for the highlight
  range: [number, number]; // Start and end positions of the highlight
  color?: string;       // Optional custom color
}
```

### Examples

```tsx
import { ReactTextMaker } from 'react-text-maker'

function MyComponent() {
  const [highlights, setHighlights] = useState([]);
  
  const handleMarkClick = (ids: string[]) => {
    console.log('Clicked highlights:', ids);
  };

  const handleMarkAdd = (item: HighlightItem) => {
    console.log('Added highlight:', item);
  };

  const handleMarkRemove = (items: HighlightItem[]) => {
    console.log('Removed highlights:', items);
    return true; // Allow removal
  };

  return (
    <ReactTextMaker
      text="This is a text that can be highlighted and annotated."
      hint="Important"
      onChange={setHighlights}
      onMarkClick={handleMarkClick}
      onMarkAdd={handleMarkAdd}
      onMarkRemove={handleMarkRemove}
      theme={[
        { hint: 'Important', color: '#ff0000' },
        { hint: 'Note', color: '#00ff00' }
      ]}
      maxCount={5}
      className="my-text-maker"
    />
  );
}
```

### Style Customization

ReactTextMaker uses Tailwind CSS for styling. You can customize styles in the following ways:

1. Using `className` and `style` props:
```tsx
<ReactTextMaker
  text="Custom style example"
  hint="Important"
  className="w-full rounded-lg"
  style={{ fontSize: '16px' }}
/>
```

2. Using `hintStyle` to customize hint text styles:
```tsx
<ReactTextMaker
  text="Hint text style example"
  hint="Important"
  hintStyle={{
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666'
  }}
/>
```

3. Using `theme` to customize highlight colors:
```tsx
<ReactTextMaker
  text="Theme color example"
  hint="Important"
  theme={[
    { hint: 'Important', color: '#ff0000' },
    { hint: 'Note', color: '#00ff00' },
    { hint: 'Reference', color: '#0000ff' }
  ]}
/>
```

### Keyboard Shortcuts

The component supports the following keyboard shortcuts:

- `Delete` / `Backspace`: Remove selected highlights

### Notes

1. The `maxCount` prop limits the maximum number of highlights. New highlights cannot be added when the limit is reached.
2. The `onMarkRemove` callback can return a `boolean` value to control whether highlight removal is allowed.
3. Highlights support nesting, allowing multiple different types of highlights in the same text area.
4. Theme colors can be specified as an array of strings or objects, with the object array method allowing independent colors for each hint type.

## TypeScript

ReactTextMaker is fully written in TypeScript and provides complete type definitions.

```tsx
import type { TextMakerProps } from 'react-text-maker'

// Using types
const props: TextMakerProps = {
  initialText: 'Hello',
  onChange: (text) => console.log(text),
  className: 'custom-class'
}
``` 