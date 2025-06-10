<script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(["onNewTask"])
  const task = ref("")

  function addNewTask(){
    emit("onNewTask", task.value )
    task.value = ""
  }

</script>
<template>
  <div class="add-form">
    <input @keyup.enter="addNewTask" v-model="task" type="text" placeholder="¿Que necesitas que se haga?">
    <button class="btn" @click="addNewTask">+</button>
  </div>
</template>