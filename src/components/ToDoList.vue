<script setup lang="ts">
import { computed, nextTick } from "@vue/runtime-core";
import ToDoListItem from './ToDoListItem.vue'

const props = defineProps(['todos', 'selected_filter']);
const emit = defineEmits(['delete']);

const filteredTodo = computed(() => {
  if (props.selected_filter === 'All') {
    return props.todos;
  } else if(props.selected_filter === 'Completed') {
    return props.todos.filter((todo) => todo.completed);
  } else if(props.selected_filter === 'Active') {
    return props.todos.filter((todo) => !todo.completed);
  } else {
    return [];
  }
});

const no_todo_info = computed(() => {
  if (props.selected_filter === 'All') {
    return `Start adding todos now !!!`;
  } else if(props.selected_filter === 'Completed') {
    return `No completed todos`;
  } else if(props.selected_filter === 'Active') {
    return `All todos are completed`;
  } else {
    return ``;
  }
})

</script>

<template>
  <ul v-if="filteredTodo.length > 0" class="space-y-4">
    <ToDoListItem 
      v-for="todo in filteredTodo" 
      :key="todo.id"
      :todo="todo"
      class="flex items-center transition-all duration-300 rounded-md shadow-md group"
      @delete="$emit('delete', $event)"
    />
  </ul>
  <div v-else class="text-center ">
    {{ no_todo_info }}
  </div>
</template>
