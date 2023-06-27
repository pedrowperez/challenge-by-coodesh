<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { useNotifications } from 'vue-browser-notifications'

const { sendNotification } = useNotifications(true)

const user = useUserStore()
const loadingInbox = ref(true)
const email = ref('')
let oldSession = reactive([])
const timerCount = reactive({ count: 20 })

async function notifyNewEmail(mails: Array<string>, oldMails: Array<string>) {
  if (oldMails) {
    if (mails.length > oldMails.length) {
      notification.success({ message: 'Novo e-mail!' })
      sendNotification('Novo e-mail!', { body: 'E-mail novo na caixa de entrada!' })
    }
  }
}

async function getSession(id?: any) {
  loadingInbox.value = true
  const sessionId = localStorage.getItem('mailSessionId')
  const key = id || sessionId
  if (key) {
    const activeSession: any = await user.getSession(key)
    const newSession = activeSession.sessionIncoming?.data?.session
    if (newSession) {
      await notifyNewEmail(newSession?.mails, oldSession)
      oldSession = newSession?.mails
      email.value = newSession?.addresses[0].address
      timerCount.count = 20
      notification.success({ message: 'Atualizado com sucesso!' })
      loadingInbox.value = false
    }
  }

  loadingInbox.value = false
}

async function setSession() {
  loadingInbox.value = true
  const sessionId = localStorage.getItem('mailSessionId')

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
    await getSession(sessionId)
    loadingInbox.value = false
  }
}

watchEffect(() => {
  if (timerCount.count === 0)
    getSession()
  if (timerCount.count > 0) {
    setTimeout(() => {
      timerCount.count--
    }, 1000)
  }
})

function resetLocal() {
  localStorage.clear()
  email.value = ''
  setSession()
}

onMounted(() => {
  setSession()
})
</script>

<template>
  <div class="px-10 lg:px-25">
    <div>
      <SharedInput v-model="email" />
      <div>
        <button class="my-4 w-full flex items-center justify-center" @click="getSession()">
          Autorefresh in {{ timerCount.count }}
          <undo-outlined spin class="pl-2" />
        </button>

        <button class="btn mb-5 bg-black px-5 py-3 text-white dark:bg-white dark:text-black" @click="resetLocal()">
          Trocar e-mail
        </button>
      </div>

      <DefaultLoad v-if="loadingInbox" />
      <Inbox v-else-if="!loadingInbox && oldSession" :session="oldSession" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
