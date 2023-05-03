<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseAuthClient()
watchEffect(() => {
  if (user.value) {
    navigateTo('/todo')
  }
})
</script>

<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-3xl font-extrabold text-center u-text-white">
      Sign in to your account
    </h2>
    <button
        class="px-2 py-1 font-bold text-center text-indigo-600 border border-indigo-300 rounded-md "
        @click="auth.signInWithOAuth({ provider: 'google' })"
    >
        Login
    </button>
  </div>
</template>
