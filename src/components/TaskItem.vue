<script setup>
import { ref, defineEmits, defineProps, nextTick } from 'vue';

const descriptionRef = ref(null)

const props = defineProps({
  item: {
    type: Object
  }
})
const emit = defineEmits(["remove"])

const isEditable = ref(false)

async function toggleEditable(){
  isEditable.value  = !isEditable.value
  if (isEditable.value){
    await nextTick()
    descriptionRef.value.focus()
  }
}
function remove(id){
  emit("remove", id)
}

</script>

<template>
  <div class="task-item">
    <input type="checkbox" v-model="props.item.done" />
    <div class="description">
      <input v-if="isEditable" ref="descriptionRef" @keyup.enter="isEditable=false" v-model="props.item.text" type="text" />
      <span v-else :class="{'is-done': props.item.done}">{{ props.item.text }}</span>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="toggleEditable">✏️</a>
      <a href="#" @click.prevent="remove(props.item.id)">❌</a>
    </div>
  </div>
</template>

<style scoped>
  .description input {
    width: 100%;
    background-color: rgb(243, 243, 246);
    border: none;
    padding: 5px 0;
  }
  .is-done {
    text-decoration: line-through;
    font-style: italic;
    color: rgb(176, 176, 176)
  }
</style>