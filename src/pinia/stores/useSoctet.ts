/**
 * webSocket store
 */

import { defineStore } from 'pinia'

export default defineStore('useSoctet', {
  state: () => ({
    messages: [] as string[],
    socket: null as WebSocket | null,
    heartbeatInterval: null as number | null
  }),
  getters: {},
  actions: {
    connect() {
      this.socket = new WebSocket('wss://echo.websocket.org/')
      this.socket.onmessage = (event) => {
        this.messages.push(event.data)
        this.resetHeartbeat()
      }
      this.socket.onerror = (event) => {
        console.error('WebSocket error:', event)
      }
      this.socket.onclose = () => {
        console.log('WebSocket connection closed')
        this.reconnect()
      }
      this.socket.onopen = () => {
        this.startHeartbeat()
      }
    },
    sendMessage(message: string) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message)
      }
    },
    disconnect() {
      if (this.socket) {
        this.stopHeartbeat()
        this.socket.close()
      }
    },
    startHeartbeat() {
      this.heartbeatInterval = window.setInterval(() => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send('heartbeat')
        } else {
          this.stopHeartbeat()
          this.reconnect()
        }
      }, 30000) // 每 30 秒發送一次心跳訊息
    },
    stopHeartbeat() {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval)
        this.heartbeatInterval = null
      }
    },
    resetHeartbeat() {
      this.stopHeartbeat()
      this.startHeartbeat()
    },
    reconnect() {
      console.log('Reconnecting...')
      this.connect()
    }
  }
})
