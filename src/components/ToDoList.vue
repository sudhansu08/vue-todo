<script setup lang="ts">
import { nextTick } from "@vue/runtime-core";
import ToDoListItem from './ToDoListItem.vue'

const props = defineProps(['todos']);
const emit = defineEmits(['delete']);

</script>

<template>
  <ul class="space-y-4" v-if="props.todos.length > 0">

    <ToDoListItem 
      v-for="todo in props.todos" 
      :key="todo.id"
      :todo="todo"
      class="flex items-center transition-all duration-300 bg-white rounded-md shadow-md group"
      @delete="$emit('delete', $event)"
    />
  </ul>

  <div v-else class="text-center ">
    Start adding todos now !!!
  </div>
</template>
