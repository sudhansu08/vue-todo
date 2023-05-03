<script setup lang="ts">

import { Database } from "~~/types/database.types";
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const { data: todos } = await useAsyncData('todos', async () => {
  const { data } = await client.from('todos').select('id, title, completed').eq('user_id', user.value?.id).order('created_at')
  return data
})

const selected_filter = ref('All');

const listRef = ref();

async function addTodo (add_todo:string) {  
  const { data } = await client.from('todos')
    .upsert({
      user_id: user.value?.id,
      title: add_todo,
      completed: false
    })
    .select('id, title, completed')
    .single()
  todos.value.push(data)
}

const deleteTodo = async (todo_id:string) => {
  todos.value = todos.value.filter((todo: any) => todo.id !== todo_id);
  await client.from('todos').delete().match({ id: todo_id })
}

</script>

<template>
  <div class="absolute w-full h-[calc(100vh-2rem)] mt-4 overflow-hidden bg-gray-100 rounded shadow-xl lg:w-3/4 lg:max-w-xl">
    <ToDoHeader @add="addTodo($event)" />

    <div class="h-[calc(100vh-11rem)] overflow-x-hidden overflow-y-auto px-6 pb-2" ref="listRef">
      <ToDoList 
        v-if="todos.length > 0"
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
