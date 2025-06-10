<script setup>
import { computed } from 'vue';

const props = defineProps({
  completed: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
})

const completedPercent = computed( () => {
  const percent = (props.completed/props.total) * 100 
  return `${percent}%`
})

</script>
<template>
  <div class="status-bar">
    <div class="progress" :style="{width: completedPercent}"></div>
    <div class="status">
      {{ props.completed }} tareas de {{ props.total }} completadas
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  background-color: azure;
}
.status{
  padding: 0px 15px;
}
.progress {
  width: 66%;
  position: absolute;
  background-color: rgba(114, 160, 197,0.4);
  height: 100%;
}
</style>