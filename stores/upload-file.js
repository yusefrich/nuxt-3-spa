import uploadService from '@/services/uploadService'
import authService from '@/services/authService'
import { defineStore } from 'pinia'

import { useBaseStore } from '@/stores/base'

export const useUploadFileStore = defineStore('uploadFile', {
  state: () => ({
    loading: false,
    files: null
  }),
  actions: {
    fetchFiles () {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, error] = await authService.getAuthFiles()

        if (error) {
          this.errors = error.response.data.errors
          const errorMessage = error.response.data.message
            ? error.response.data.message
            : 'Erro ao buscar documentos!'

          this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          this.loading = false
          reject(error)
        }

        this.loading = false
        this.files = data
        resolve(data)
      })
    },
    sendFile (payload) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, error] = await uploadService.submitAuthFiles(payload)

        if (error) {
          this.errors = error.response.data.errors
          const errorMessage = error.response.data.message
            ? error.response.data.message
            : 'Erro ao salvar a foto enviada!'

          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          this.loading = false
          reject(error)
        }

        this.loading = false
        // this._vm.$toast.open({ message: 'Arquivo enviado com sucesso!', type: 'success' })
        resolve(data)
      })
    },
    deleteFile ({ commit, dispatch }, payload) {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        const [data, error] = await authService.deleteAuthFile(payload)
  
        if (error) {
          const errorMessage = error.response.data.message
            ? error.response.data.message
            : 'Erro ao salvar a foto enviada!'
  
          this.loading = false
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(error)
        }
  
        this.loading = false
        // this._vm.$toast.open({ message: 'Arquivo deletado com sucesso!', type: 'success' })

        const baseStore = useBaseStore()
  
        baseStore.authUser()
  
        resolve(data)
      })
    }
  },
  getters: {
    getLoading (state) {
      return state.loading
    }
  }
})
