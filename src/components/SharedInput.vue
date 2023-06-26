<script setup lang="ts">
import { notification } from 'ant-design-vue'

const { modelValue } = defineModels<{
  modelValue: string
}>()

async function copyMail(email: string) {
  await navigator.clipboard.writeText(email)
  notification.success({ message: 'Copiado!' })
}
</script>

<template>
  <div class="w-full flex items-end justify-center">
    <div class="w-100 flex flex-col">
      <label class="text-left"> Your temporary email address</label>
      <a-input v-model:value="modelValue" placeholder="Your temporary email address is..." bordered />
    </div>
    <a-button class="ml-5" @click="copyMail(modelValue)">
      Copy
    </a-button>
  </div>
</template>
