<template>
  <div ref="container" class="demo"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { createRoot } from 'react-dom/client'
import { ReactTextMaker } from 'react-text-maker'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  onChange: {
    type: Function,
    default: () => {}
  },
  className: {
    type: String,
    default: ''
  }
})

const container = ref(null)

onMounted(() => {
  const root = createRoot(container.value)
  root.render(
    <ReactTextMaker
      text={props.text}
      hint="size"
      onChange={props.onChange}
      className={props.className}
    />
  )
})
</script> 