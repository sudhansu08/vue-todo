import { computed, ref, watch } from "vue";

export function useTodos() {
    let data = ref([]);
    
    let storedData = read();

    if (storedData) {
        data = ref(storedData);
    }

    watch(data, write, { deep: true });

    function read() {
        return JSON.parse(localStorage.getItem('todos'));
    }

    function write() {
        if (data.value === null || data.value === '') {
            localStorage.removeItem('todos');
        } else {
            localStorage.setItem('todos', JSON.stringify(data.value));
        }
    }

    return data;
}