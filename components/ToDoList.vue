<script setup lang="ts">
const props = defineProps(['todos', 'selectedFilter'])
// eslint-disable-next-line unused-imports/no-unused-vars
const emit = defineEmits(['delete'])

const filteredTodo = computed(() => {
  if (props.selectedFilter === 'All')
    return props.todos
  else if (props.selectedFilter === 'Completed')
    return props.todos.filter((todo: any) => todo.completed)
  else if (props.selectedFilter === 'Active')
    return props.todos.filter((todo: any) => !todo.completed)
  else
    return []
})

const no_todo_info = computed(() => {
  if (props.selectedFilter === 'All')
    return 'Start adding todos now !!!'
  else if (props.selectedFilter === 'Completed')
    return 'No completed todos'
  else if (props.selectedFilter === 'Active')
    return 'All todos are completed'
  else
    return ''
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
