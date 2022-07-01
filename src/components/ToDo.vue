<script setup lang="ts">
import ToDoHeader from './ToDoHeader.vue'
import ToDoList from './ToDoList.vue'

import { useTodos } from "./stores/useTodos";
import { ref } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';

const todos = useTodos();
const listRef = ref();

async function addTodo(add_todo) {
	todos.value.push({
    id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
    todo: add_todo,
    completed: false
  });
  await nextTick;
  listRef.value.scrollTop = listRef.value.scrollHeight;
}

function deleteTodo(todo_id) {  
  let newTodos = (todos.value).filter((todo) => todo.id !== todo_id);
  todos.value = newTodos;
}

</script>

<template>
  <div class="w-full h-[calc(100vh-2rem)] p-6 m-4 overflow-hidden bg-gray-100 rounded shadow lg:w-3/4 lg:max-w-lg">
    <ToDoHeader @add="addTodo($event)" />

    <div class="h-[calc(100vh-10rem)] overflow-x-hidden overflow-y-auto" ref="listRef">
      <ToDoList :todos="todos" @delete="deleteTodo($event)" @update="updateTodo($event)" class="" />
    </div>
  </div>

</template>
