# Quick Start

React Text Maker is a simple yet powerful text editing component that provides basic text editing functionality with support for custom styles and themes.

## Features

- 🎨 Customizable styles
- 📱 Responsive design
- 🔧 TypeScript support
- ⚡️ Lightweight, no extra dependencies
- 🎯 Simple and easy-to-use API

## Basic Example

```tsx
import { ReactTextMaker } from 'react-text-maker'

function App() {
  return (
    <ReactTextMaker
      text="Hello, World!"
      className="my-custom-class"
      hint="size"
    />
  )
}
```

## Live Demo

<script setup>
import { ReactTextMaker } from '../../src/ReactTextMaker'
</script>

<div class="demo">
  <ReactTextMaker
    text="Try typing some text here..."
    className="demo-text-maker"
    hint="size"
  />
</div>

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