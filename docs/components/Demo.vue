::: warning
This is a Vue component that wraps our React component for demo purposes.
:::

<template>
  <div class="demo">
    <div ref="container"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { APP } from '../examples/app';

export default {
  name: 'Demo',
  setup() {
    const container = ref(null);

    onMounted(() => {
      const root = createRoot(container.value);
      root.render(
        React.createElement(APP)
      );
    });

    return {
      container
    };
  }
};
</script>

<style scoped>
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