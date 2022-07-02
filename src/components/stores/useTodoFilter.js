import { computed, ref, watch } from "vue";

export function useTodoFilter(todos) {
    const filters = ref(['All', 'Completed', 'Active']);
    const selected_filter = ref('All');

    function applyFilter(filter) {
        selected_filter.value = filter
    }

    return {
        filters,
        selected_filter,
        applyFilter
    };
}