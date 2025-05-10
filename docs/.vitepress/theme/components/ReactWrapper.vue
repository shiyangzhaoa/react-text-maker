<template>
  <div ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { createRoot } from 'react-dom/client'
import { BasicDemo, CallbackDemo, StyledDemo } from '../../examples/Demo'

const props = defineProps({
  component: {
    type: String,
    required: true
  }
})

const container = ref(null)

onMounted(() => {
  const root = createRoot(container.value)
  const components = {
    BasicDemo,
    CallbackDemo,
    StyledDemo
  }
  const Component = components[props.component]
  root.render(Component())
})
</script> 