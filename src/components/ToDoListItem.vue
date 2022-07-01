<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import { useTodoForm } from "./stores/useTodoForm";

const props = defineProps(['todo']);

const emit = defineEmits(['delete']);

const inputUpdateTodo = ref();
const edit_todo = ref('');
const isShowingEditForm = computed(() => props.todo.id === useTodoForm.value.editing_todo_id);
const showError = computed(() => !edit_todo.value || (edit_todo.value).trim() === '' );

async function showEditForm() {
  useTodoForm.value.show_add_todo = false;
  useTodoForm.value.editing_todo_id = props.todo.id;
  edit_todo.value = props.todo.todo;

  await nextTick;
  inputUpdateTodo.value.focus();
}

function updateTodo() {
  if (showError.value) {
    inputUpdateTodo.value.focus();
		return;
	}

  props.todo.todo = (edit_todo.value).trim();
  useTodoForm.value.editing_todo_id = null;
}

function deleteTodo(todo_id) {
  confirm("Delete?");
  emit('delete', todo_id);
}

</script>

<template>
  <li>
    <div class="flex-1 p-4" v-if="!isShowingEditForm">
      <input 
        :id="'cb-' + todo.id"
        type="checkbox" 
        class="float-left w-4 h-4 mt-1 mr-2 align-top cursor-pointer" 
        v-model="todo.completed"
      >
  
      <label 
        :for="'cb-' + todo.id"
        class="inline-block text-gray-900 break-words"
        :class="{'line-through': todo.completed}"
      >
        {{ todo.todo }}
      </label>
    </div>
  
    <div class="hidden group-hover:block" v-if="!isShowingEditForm">
      <button 
        class="p-1 mr-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:bg-indigo-700"
        @click="showEditForm()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button 
        class="p-1 mr-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-700"
        @click="deleteTodo(todo.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <div class="w-full" v-if="isShowingEditForm">
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <form 
          v-if="isShowingEditForm"
          @submit.prevent="updateTodo()"
          class="p-4 bg-gray-200 border rounded-lg"
          >
          <input 
            type="text" 
            ref="inputUpdateTodo"
            v-model="edit_todo"
            placeholder="Update todo" 
            class="block w-full p-3 text-sm border-gray-200 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 "
          >
          <div v-if="showError" class="pt-1 text-sm text-red-500" >
            This field is required.
          </div>
          <div class="mt-2 space-x-2">
            <button 
              type="submit"
              class="px-2 py-1 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:bg-indigo-700"
            >
              Save
            </button>
            <button 
              type="button"
              @click="useTodoForm.editing_todo_id = null"
              class="px-2 py-1 font-bold text-white bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </transition>
    </div>
    
  </li>
</template>
