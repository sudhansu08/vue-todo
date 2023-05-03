<script setup lang="ts">
import { Database } from "~~/types/database.types";
const client = useSupabaseClient<Database>();

const props = defineProps(['todos', 'selected_filter']);
const emit = defineEmits(['update:selected_filter', 'update:todos']);

const filters = ref(['All', 'Completed', 'Active']);

const footer_info = computed(() => {
  if (props.selected_filter === 'All') {
    return `${props.todos.length} todos total `;
  } else if(props.selected_filter === 'Completed') {
    return `${completedTodo.value.length}/${props.todos.length} todos completed`;
  } else if(props.selected_filter === 'Active') {
    let active = props.todos.length - completedTodo.value.length;
    return `${active}/${props.todos.length} todos active`;
  } else {
    return ``;
  }
})

const completedTodo = computed(() => {
  return props.todos.filter((todo: any) => todo.completed)
});

const deleteCompleted = async () => {
  if(confirm("Delete?")) {
    let newTodos = props.todos.filter((todo: any) => todo.completed === false);
    await client.from('todos').delete().match({ completed: true })
    emit('update:todos', newTodos);
  }
}

function doFilter(filter:string) {
  emit('update:selected_filter', filter);
}

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}

</script>

<template>
  <div 
      v-if="props.todos.length > 0"
      class="sticky top-[100vh] p-4 bg-gray-300 shadow-md text-sm text-gray-900  "
    >
      <div class="flex justify-between">
        <div class="">
          {{ footer_info }}
        </div>
        <div class="flex space-x-3">
          <div 
            v-for="(filter,index) in filters" 
            :key="index" 
            :class="{'text-blue-600': filter === props.selected_filter}"
          >
            <a
              href="#"
              class="no-underline text-grey-darkest hover:bg-pink-lighter"
              @click.prevent="doFilter(filter)"
            >
              {{ filter }}
            </a>
          </div>
          <div class="flex justify-start" v-if="completedTodo.length > 0" >
            <div class="pr-2">|</div>
            <div class="text-red-500 ">
              <a
                href="#"
                class="no-underline text-grey-darkest hover:bg-pink-lighter"
                @click.prevent="deleteCompleted()"
              >
                Clear {{ completedTodo.length }} completed items
              </a>
            </div>
          </div>
          <div class="flex justify-start">
            <div class="pr-2">|</div>
            <div>
              <a
                href="#"
                class="no-underline text-grey-darkest hover:bg-pink-lighter"
                @click.prevent="logout()"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
