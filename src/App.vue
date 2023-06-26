<script setup lang="ts">
useHead({
  title: 'DropMail.api / Coodesh',
  meta: [
    { name: 'description', content: 'This is a challenge by Coodesh' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
