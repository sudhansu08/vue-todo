import { computed, ref, watch } from "vue";

export const useTodoForm = ref({
    show_add_todo: false,
    editing_todo_id: null
});