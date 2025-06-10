<script setup>
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import NewTaskForm from '@/components/NewTaskForm.vue';
import StatusBar from '@/components/StatusBar.vue';
import TaskList from '@/components/TaskList.vue';

function generateId() {
  return Math.random().toString(36).substr(2, 8); 
}


const tasks = useStorage("tasks", [
  {id: "xxx", done: true, text: "Mi primera tarea"},
  {id: "yyy", done: false, text: "Mi segunda tarea"},
  {id: "zzz", done: true, text: "Mi tercera tarea"},
])

const completed = computed(() => tasks.value.filter(item => item.done))
const incompleted = computed(() => tasks.value.filter(item => !item.done))

function addNewTask(task){
  const taskObject = {
    id: generateId(),
    done: false,
    text: task
  }
  tasks.value.push(taskObject)
}

function removeCompleted(){
  tasks.value = incompleted.value
  //completed.value.forEach(item =>removeItem(item.id))
}

function removeItem(id){
  const index = tasks.value.findIndex(item => item.id === id)
  if (index === -1) return
  tasks.value.splice(index, 1)
}

</script>
<template>
<div class="container">

  <div class="todo-app">
    <h2>TODO LIST</h2>
    <NewTaskForm @onNewTask="addNewTask" />
    
    <TaskList :tasks="tasks" @remove="removeItem" />
    
    <footer v-if="tasks.length > 0">
      <StatusBar :completed="completed.length" :total="tasks.length"></StatusBar>
      <button :disabled="completed.length ===0" class="btn" @click="removeCompleted">Borrar completadas</button>
  </footer>
</div>
</div>

</template>