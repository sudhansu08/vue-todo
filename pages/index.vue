<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseAuthClient()
watchEffect(() => {
  if (user.value)
    navigateTo('/todo')
})
</script>

<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 ">
    <h2 class="my-6 text-3xl font-extrabold text-center u-text-white">
      Welcome :)
    </h2>
    <button
      class="flex gap-2 px-4 py-2 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow"
      @click="auth.signInWithOAuth({ provider: 'google' })"
    >
      <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
      <span>Login with Google</span>
    </button>
  </div>
</template>
