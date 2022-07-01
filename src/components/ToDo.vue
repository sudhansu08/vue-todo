<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import ToDoList from './ToDoList.vue'

const inputNewTodo = ref();
const add_todo = ref();
const isShowingAddForm = ref(false);
const todos = ref([]);

async function showAddForm() {
  isShowingAddForm.value = true;
  await nextTick;
  inputNewTodo.value.focus();
}

function addTodo() {
  if (add_todo.value === '') {
    return;
  }
  
  let localTodos = localStorage.getItem('todos');
  if (localTodos) {
    todos.value = JSON.parse(localTodos);
  }
  
  todos.value.push({
    id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
    todo: add_todo.value,
    completed: false
  });
  
  localStorage.setItem('todos', JSON.stringify(todos.value));

  add_todo.value = '';
}

function deleteTodo(todo_id) {
  console.log(todo_id);
  
  let newTodos = (todos.value).filter((todo) => todo.id !== todo_id);

  todos.value = newTodos;
  console.log(newTodos);
  
  localStorage.setItem('todos', JSON.stringify(newTodos));
}

onMounted(() => {
  let localTodos = localStorage.getItem('todos');
  if (localTodos) {
    const todoArr = JSON.parse(localTodos);
    
    todoArr.forEach(todo => {
      todos.value.push(todo);
    });
  }
})

</script>

<template>
  <div class="">
    <div class="flex justify-between pb-4 mb-4 border-b-2 border-gray-500">
      <div class="text-3xl font-bold">
        Todo
      </div>
      <div 
        v-if="!isShowingAddForm"
        class=""
      >
        <button 
          @click="showAddForm"
          class="flex items-center px-2 py-1 font-bold text-indigo-600 border border-indigo-300 rounded-md "
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg> 
          <span class="pl-1">
            Add new
          </span>
        </button>
      </div>
    </div>

    <div class="mb-4">
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <form 
          v-if="isShowingAddForm"
          @submit.prevent="addTodo"
          class="p-4 bg-gray-200 border rounded-lg"
          >
          <input 
            type="text" 
            ref="inputNewTodo"
            v-model="add_todo"
            placeholder="Add new todo" 
            class="block w-full p-3 text-sm border-gray-200 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 "
          >
          <div class="mt-2 space-x-2">
            <button 
              type="submit"
              class="px-2 py-1 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:bg-indigo-700"
            >
              Add
            </button>
            <button 
              type="button"
              @click="isShowingAddForm = false"
              class="px-2 py-1 font-bold text-white bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </transition>
    </div>

    <ToDoList :todos="todos" @delete="deleteTodo" />
    
  </div>

</template>
