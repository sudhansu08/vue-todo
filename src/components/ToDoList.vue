<script setup lang="ts">
import { nextTick } from "@vue/runtime-core";


const props = defineProps(['todos']);

function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(props.todos));
}

async function deleteTodo(todo_id) {
  let newTodos = props.todos.filter((todo) => todo.id !== todo_id);

  // props.todos = newTodos;
  // console.log(newTodos);
  
  localStorage.setItem('todos', JSON.stringify(newTodos));

  await nextTick();
  
}

</script>

<template>
  <ul class="flex flex-col space-y-4" v-if="props.todos.length > 0">

    <li 
      v-for="todo in props.todos" 
      :key="todo.id"
      class="flex items-center transition-all duration-300 bg-white rounded-md shadow-md group"
    >
      <div class="flex-1 p-4">
        <input 
          :id="'cb-' + todo.id"
          type="checkbox" 
          class="float-left w-4 h-4 mt-1 mr-2 align-top cursor-pointer" 
          v-model="todo.completed" 
          @change="saveTodo()"
        >

        <label 
          :for="'cb-' + todo.id"
          class="inline-block text-gray-900 break-words "
          :class="{'line-through': todo.completed}"
        >
          {{ todo.todo }}
        </label>
      </div>

      <div class="hidden group-hover:block">
        <!-- <button class="p-1 mr-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:bg-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button> -->
        <button 
          class="p-1 mr-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-700"
          @click="deleteTodo(todo.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
    </li>
  </ul>

  <div v-else class="text-center ">
    Start adding todos now !!!
  </div>
</template>
