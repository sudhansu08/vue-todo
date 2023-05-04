<script setup lang="ts">
const emit = defineEmits(['add'])
const inputNewTodo = ref()
const add_todo = ref('')

const show_add_todo = useState('show_add_todo', () => false)
const editing_todo_id = useState('editing_todo_id', () => null)

const isShowingAddForm = computed(() => show_add_todo.value)
const showError = computed(() => !add_todo.value || (add_todo.value).trim() === '')

async function showAddForm() {
  show_add_todo.value = true
  editing_todo_id.value = null

  await nextTick
  inputNewTodo.value.focus()
}

function addTodo() {
  if (showError.value) {
    inputNewTodo.value.focus()
    return
  }
  emit('add', (add_todo.value).trim())
  add_todo.value = ''
  show_add_todo.value = false
}
</script>

<template>
  <div class="p-6 pb-0">
    <div class="flex justify-between pb-4 mb-4 border-b-2 border-gray-500">
      <div class="text-3xl font-bold text-gray-800">
        Todo
      </div>
      <div
        v-if="!isShowingAddForm"
        class=""
      >
        <button
          class="flex items-center px-2 py-1 font-bold text-indigo-600 border border-indigo-300 rounded-md "
          @click="showAddForm"
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
          class="p-4 bg-gray-200 border rounded-lg"
          @submit.prevent="addTodo"
        >
          <input
            ref="inputNewTodo"
            v-model="add_todo"
            type="text"
            placeholder="Add new todo"
            class="block w-full p-3 text-sm border-gray-200 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 "
          >
          <div v-if="showError" class="pt-1 text-sm text-red-500">
            This field is required.
          </div>
          <div class="mt-2 space-x-2">
            <button
              type="submit"
              class="px-2 py-1 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:bg-indigo-700"
            >
              Add
            </button>
            <button
              type="button"
              class="px-2 py-1 font-bold text-white bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-700"
              @click="show_add_todo = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>
