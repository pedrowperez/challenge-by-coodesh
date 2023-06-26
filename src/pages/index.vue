<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { useNotifications } from 'vue-browser-notifications'

const { requestPermission, sendNotification } = useNotifications(true)

const user = useUserStore()
const loading = ref(true)
const loadingInbox = ref(true)
const email = ref('')
let sessionContent = reactive([])
const timerCount = reactive({ count: 20 })

async function setSession() {
  const sessionId = localStorage.getItem('mailSessionId')
  loading.value = true
  loadingInbox.value = true

  if (!sessionId) {
    const response: any = await user.setNewSession()
    const { newSession } = response
    const { type, message, description, getEmail } = newSession

    type === 'success'
      ? notification.success({ message, description })
      : notification.warning({ message, description })

    email.value = getEmail
  }
  else {
    const activeSession: any = await user.getSession(sessionId)
    if (activeSession.sessionIncoming?.data?.session) {
      await notifyNewEmail(activeSession.sessionIncoming?.data?.session?.mails, sessionContent)
      sessionContent = activeSession.sessionIncoming?.data?.session?.mails
      email.value = activeSession.sessionIncoming?.data?.session?.addresses[0].address
      timerCount.count = 20
      loadingInbox.value = false
    }
  }
  loading.value = false
}

watchEffect(() => {
  if (timerCount.count === 0)
    setSession()
  if (timerCount.count > 0) {
    setTimeout(() => {
      timerCount.count--
    }, 1000)
  }
})

async function notifyNewEmail(mails: Array<string>, oldMails: Array<string>) {
  if (oldMails) {
    if (mails.length > oldMails.length) {
      notification.success({ message: 'Novo e-mail!' })
      sendNotification('Novo e-mail!', { body: 'E-mail novo na caixa de entrada!' })
    }
  }
}

onMounted(() => {
  setSession()
})
</script>

<template>
  <div class="px-10 lg:px-25">
    <div>
      <SharedInput v-model="email" />
      <button class="my-4 w-full flex items-center justify-center" @click="setSession()">
        Autorefresh in {{ timerCount.count }}
        <undo-outlined spin class="pl-2" />
      </button>
      <DefaultLoad v-if="loadingInbox" />
      <Inbox v-else-if="!loadingInbox && sessionContent" :session="sessionContent" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
