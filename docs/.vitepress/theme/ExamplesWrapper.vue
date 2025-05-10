<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import Examples from '../../examples/index.tsx';

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (container.value) {
    const root = createRoot(container.value);
    root.render(createElement(Examples));
  }
});
</script> 