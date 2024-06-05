import { ref } from 'vue'
import { useSoctet } from '../pinia/index'

export default function useSockets() {
  const { connect, disconnect, sendMessage } = useSoctet()
  const message = ref('' as string)

  const connectWebSocket = () => {
    connect()
  }

  const disconnectWebSocket = () => {
    disconnect()
  }

  const sendMessageServer = () => {
    if (message.value.trim() !== '') {
      sendMessage(message.value)
      message.value = ''
    }
  }

  return {
    connectWebSocket,
    disconnectWebSocket,
    sendMessageServer,
    message
  }
}
