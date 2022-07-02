<script setup lang="ts">
import ToDoHeader from './ToDoHeader.vue'
import ToDoList from './ToDoList.vue'
import ToDoFooter from './ToDoFooter.vue'

import { useStorage } from "./stores/useStorage";
import { ref } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';

const todos = useStorage('todos', []);
const selected_filter = useStorage('selected_filter', 'All');
const listRef = ref();

async function addTodo(add_todo:string) {
	todos.value.push({
    id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
    todo: add_todo,
    completed: false
  });
  await nextTick;
  listRef.value.scrollTop = listRef.value.scrollHeight;
}

function deleteTodo(todo_id:string) {
  let newTodos = (todos.value).filter((todo: any) => todo.id !== todo_id);
  todos.value = newTodos;
}

</script>

<template>
  <div class="absolute w-full h-[calc(100vh-2rem)] mt-4 overflow-hidden bg-gray-100 rounded shadow-xl lg:w-3/4 lg:max-w-xl">
    <ToDoHeader @add="addTodo($event)" />

    <div class="h-[calc(100vh-11rem)] overflow-x-hidden overflow-y-auto px-6 pb-2" ref="listRef">
      <ToDoList 
        :todos="todos" 
        :selected_filter="selected_filter" 
        @delete="deleteTodo($event)" 
      />
    </div>

    <ToDoFooter 
      v-if="todos.length > 0"
      v-model:todos="todos"
      v-model:selected_filter="selected_filter"
    />

  </div>

</template>
