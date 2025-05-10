---
layout: doc
---

# React Text Maker

A React component for text highlighting and annotation with customizable themes and interactive features.

## Try It Out

<ClientOnly>
  <Demo />
</ClientOnly>

## Basic Usage

```jsx
import { ReactTextMaker } from 'react-text-maker';

function App() {
  return (
    <ReactTextMaker
      text="Select this text to create a highlight annotation."
      hint="Important"
    />
  );
}
```

<script setup>
import Demo from './components/Demo.vue';
</script>

<style>
.demo {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1rem 0;
}

.demo-text-maker {
  width: 100%;
}
</style>

## Features

- 🎨 Customizable highlight colors and themes
- 🖱️ Interactive text selection and highlighting
- ⌨️ Keyboard shortcuts support (Delete/Backspace to remove highlights)
- 🎯 Multiple highlight support with nested annotations
- 🔍 Customizable hint text display
- 🎭 Theme-based highlighting system
- ⚡ Real-time highlight updates
- 🧪 Comprehensive test coverage

## Installation

```bash
# Using npm
npm install react-text-maker

# Using yarn
yarn add react-text-maker

# Using pnpm
pnpm add react-text-maker
```

## Documentation Navigation

- [Installation Guide](./guide/installation.md) - Learn how to install and configure
- [API Documentation](./guide/api.md) - View detailed API documentation
- [Examples](./examples/index.md) - Browse more usage examples
