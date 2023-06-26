<script setup lang="ts">
const { session } = defineProps<Props>()
const listMails = ref([])
const selectedMail = ref({})

interface mailBox {
  rawSize?: number
  fromAddr?: string
  toAddr?: string
  downloadUrl?: string
  text?: string
  headerSubject?: string
}
interface Props {
  session: mailBox[]
}

function receiveToMailBox(mail: Object) {
  if (mail)
    selectedMail.value = mail
}

onMounted(() => {
  if (session.length > 0)
    listMails.value = session
})
</script>

<template>
  <section v-if="listMails.length > 0" class="flex flex-col border-1 lg:flex-row">
    <div class="w-full pt-2 text-left lg:w-30%">
      <label class="p-3 font-bold"> Inbox </label>
      <ul>
        <li
          v-for="mail in listMails" :key="mail.downloadUrl"
          class="my-2 flex flex-col cursor-pointer items-start border-b-1 border-r-1 border-t-1 p-5 hover:bg-[#ff0000] hover:text-black"
          @click="receiveToMailBox(mail)"
        >
          <h5 m-0 p-0 text-10px text-black dark:text-white>
            {{ mail.fromAddr }}
          </h5>
          <h2 m-0 p-0 text-14px font-bold text-black dark:text-white>
            {{ mail.headerSubject }}
          </h2>
          <h3 m-0 p-0 text-10px text-black dark:text-white>
            {{ mail.text.substring(0, 52) }}...
          </h3>
        </li>
      </ul>
    </div>
    <MailBox v-show="selectedMail" :mail="selectedMail" />
  </section>
  <section v-else>
    <div class="w-full border-1 p-5 text-center">
      <label class="font-bold text-white"> Nenhum e-mail na caixa de entrada! </label>
    </div>
  </section>
</template>
