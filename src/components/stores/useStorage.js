import { ref, watch } from "vue";

export function useStorage(name, data) {    
    let storedData = read();

    if (storedData) {
        data = ref(storedData);
    } else {
        data = ref(data);
        write();
    }

    watch(data, write, { deep: true });

    function read() {
        return JSON.parse(localStorage.getItem(name));
    }

    function write() {
        if (data.value === null || data.value === '') {
            localStorage.removeItem(name);
        } else {
            localStorage.setItem(name, JSON.stringify(data.value));
        }
    }

    return data;
}