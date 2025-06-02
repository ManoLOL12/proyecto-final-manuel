<script setup>
import { ref } from 'vue';

const newMember = ref("")
const crew = ref(["Adonay", "Alberto", "Manuel", "Marcos", "Paloma", "Raquel"])

function addMember(){
  crew.value.push(newMember.value)
  newMember.value = ""
}

function removeLast(){
  crew.value.pop()
}
</script>

<template>
  <section>
    <h1>Tripulación</h1>
    <input  @keyup.enter="addMember" v-model="newMember" placeholder="Nuevo miembro" />
    <button @click="addMember">Añadir</button>
    <ul>
      <li v-for="member in crew">{{ member }}</li>
    </ul>
    <button @click="removeLast">Eliminar último</button>
  </section>
</template>