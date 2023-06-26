import { acceptHMRUpdate, defineStore } from 'pinia'
import { fetchConfig } from '~/helpers/fetchConfig'

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const baseApi = `https://proxy.cors.sh/${import.meta.env.VITE_DROPMAIL}`

  async function showMail(result: any) {
    const idSession = result.data?.introduceSession?.id
    localStorage.setItem('mailSessionId', idSession)
    const mail = await getSession(idSession)
    return idSession
      ? { type: 'success', message: 'Tudo certo!', description: 'E-mail gerado com sucesso!', getEmail: result.data.introduceSession.addresses[0].address, mail }
      : { type: 'error', message: 'Ooops!', description: 'Algo deu errado, tente novamente mais tarde!' }
  }

  async function setNewSession() {
    try {
      const requestOptions: any = {
        ...fetchConfig(),
        body: JSON.stringify({ query: 'mutation {introduceSession {id, expiresAt, addresses {address}}}' }),
      }

      const newSession = await fetch(baseApi, requestOptions)
        .then(response => response.json())
        .then(response => showMail(response))
      return {
        newSession,
      }
    }
    catch (err) {
      error.value = err as Error
    }
    finally {
      loading.value = false
    }
  }

  async function getSession(id: string) {
    try {
      const requestOptions: any = {
        ...fetchConfig(),
        body: JSON.stringify({
          query: 'query ($id: ID!) {session(id:$id) { addresses {address}, mails{rawSize, fromAddr, toAddr, downloadUrl, text, headerSubject}} }',
          variables: `{"id": "${id}"}`,
        }),
      }

      const sessionIncoming = await fetch(baseApi, requestOptions)
        .then(response => response.json())
      return {
        sessionIncoming,
      }
    }
    catch (err) {
      error.value = err as Error
    }
    finally {
      loading.value = false
    }
  }

  return {
    error, loading, setNewSession, showMail, getSession, notifyNewEmail,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
