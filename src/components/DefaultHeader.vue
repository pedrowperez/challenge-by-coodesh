<script setup lang="ts">

</script>

<template>
  <header class="fixed top-0 mx-0 w-full flex justify-around bg-black px-10 py-1 text-white dark:bg-white dark:text-black">
    <img src="https://dropmail.me/static/img/icon-80x80.png" alt="" class="max-h-30px bg-white dark:bg-black">

    <button title="darkMode" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>
  </header>
</template>
