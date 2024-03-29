export function useStorage(name: string, data: any) {
  const storedData = read()

  if (storedData) {
    data = ref(storedData)
  }
  else {
    data = ref(data)
    write()
  }

  watch(data, write, { deep: true })

  function read() {
    const value = localStorage.getItem(name)
    return value ? JSON.parse(value) : ''
  }

  function write() {
    if (data.value === null || data.value === '')
      localStorage.removeItem(name)
    else
      localStorage.setItem(name, JSON.stringify(data.value))
  }

  return data
}
