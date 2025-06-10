<script setup>
import { defineProps, defineEmits} from 'vue';
import TaskItem from '@/components/TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array
  }
})

const emit = defineEmits(["remove"])

function removeItem(id){
  emit("remove", id)
}


</script>

<template>
    <div class="tasks-list" v-if="props.tasks.length>0">
      <TaskItem v-for="task in props.tasks" :item="task" @remove="removeItem"></TaskItem>
    </div>
    <div v-else class="no-tasks">
      Aún no tienes ninguna tarea. Añade la primera con el formulario de arriba
    </div>
</template>