<script setup lang="ts">
const { mail } = defineProps<Props>()

interface Props {
  mail: {
    text?: string
    toAddr?: string
    fromAddr?: string
    headerSubject?: string
  }
}
</script>

<template>
  <div v-if="mail.text" w-full pl-5 pt-5 text-left text-12px lg:ml-5 lg:border-b-1 lg:border-l-1>
    <div flex flex-col border-b-1 pb-3>
      <div>
        to: <label v-html="mail.toAddr" />
      </div>
      <div>
        from: <label v-html="mail.fromAddr" />
      </div>
    </div>
    <div border-b-1 border-l-1 py-2 pl-2>
      subject: <label v-html="mail.headerSubject" />
    </div>
    <div pr-3 pt-4>
      <p v-html="mail.text" />
    </div>
  </div>
</template>
