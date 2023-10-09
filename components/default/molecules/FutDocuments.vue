<template>
  <div id="documents-collapse" class="accordion accordion-flush">
    <div class="accordion-item mb-2">
      <h2 id="sended" class="accordion-header">
        <fut-button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#sended-collapse">
          <font-awesome-icon class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'file-alt']" />
          <div class="d-flex justify-content-between w-100">
            <span>{{ $t('i18n_documentos_enviados') }}</span>
            <small class="me-3 badge bg-secondary rounded">{{ +loggedInUser.player.files.length + +uploadedFiles.length }}</small>
          </div>
        </fut-button>
      </h2>
      <div id="sended-collapse" class="accordion-collapse collapse" aria-labelledby="sended" data-bs-parent="#documents-collapse">
        <div class="accordion-body ">
          <div class="document-list-to-send">
            <table class="table text-white fut-color-dynamic">
              <thead>
                <tr>
                  <th scope="col">
                    {{ $t('i18n_documento') }}
                  </th>
                  <th scope="col">
                    {{ $t('i18n_data') }}
                  </th>
                  <th scope="col">
                    {{ $t('i18n_estado') }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="loggedInUser.player.files && loggedInUser.player.files[0]">
                <tr v-for="file in loggedInUser.player.files" :key="'file_key_'+file.id">
                  <th scope="row">
                    {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                  </th>
                  <td>{{ formattedData(file.created_at) }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="[
                        file.status_br === 'Reprovado' ? 'bg-danger' : '',
                        file.status_br === 'Aprovado' ? 'bg-success' : '',
                        file.status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                      ]"
                    >
                      {{ file.status_br }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="uploadedFiles">
                <tr v-for="file in uploadedFiles" :key="'file_key_'+file.id">
                  <th scope="row">
                    {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                  </th>
                  <td>{{ formattedData(file.created_at) }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="[
                        file.status_br === 'Reprovado' ? 'bg-danger' : '',
                        file.status_br === 'Aprovado' ? 'bg-success' : '',
                        file.status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                      ]"
                    >
                      {{ file.status_br }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-background p-3 doc-info-card">
      <div class="d-flex">
        <img class="img-fluid me-3" src="/id.png" width="60px" height="60px" style="object-fit: contain">
        <div class="header-title--text">
          <div class="title text-white fut-color-dynamic">
            {{ $t('i18n_processo_de_verificacao') }}
          </div>
          <div class="sub-title text-white fut-color-dynamic">
            {{ $t('i18n_para_completar_o_processo') }}
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 id="flush-headingOne" class="accordion-header">
        <fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#doc-id">
          <font-awesome-icon class="text-white fut-color-dynamic icon me-2" :icon="['far', 'id-card']" /> {{ $t('i18n_documento_de_identificacao') }}
        </fut-button>
      </h2>
      <div id="doc-id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#documents-collapse">
        <div class="accordion-body ">
          <fut-select
            v-model="form"
            :validate="errors?errors:{}"
            :options="fileOptions"
            name="form"
            class="mb-3"
            :placeholder="$t('i18n_selecionar_tipo_do_documento')"
          />
          <p
            v-for="message in errors?errors.type:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <p
            v-for="message in errors?errors.file:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <div v-if="form" class="row mx-0">
            <div class="col-md-6 position-relative p-0">
              <div v-if="idFrontSent" class="sended-message text-center">
                <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <font-awesome-icon class="ms-1" :icon="['fas', 'check']" /></span>
                <br>
                <fut-button class="text-dark" @click="idFrontSent = false">
                  <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                </fut-button>
              </div>
              <div v-if="idFrontSent" class="sended-bg" />
              <div class="p-3">
                <h4>{{ $t('i18n_frente_do_documento') }}</h4>
                <input
                  ref="idFront"
                  hidden
                  type="file"
                  accept="image/*,.pdf"
                  @change="event => changeFile('id-front', event)"
                >
                <fut-button class="btn file-input" @click="openFileInput('idFront')">
                  <img
                    v-if="getFile('id-front') && !getFile('id-front').src.includes('pdf;base64')"
                    style="object-fit: contain"
                    class="img-sender"
                    height="200px"
                    width="100%"
                    :src="getFile('id-front').src"
                  >
                  <font-awesome-icon v-if="getFile('id-front') && getFile('id-front').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                  <font-awesome-icon v-if="!getFile('id-front')" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                  <span>{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                </fut-button>
                <div class="row mt-2">
                  <div class="col-6">
                    <fut-button class="fw-bold" outline_primary block @click="modal.idFront = true">
                      {{ $t('i18n_exemplo') }}
                    </fut-button>
                  </div>
                  <div class="col-6">
                    <fut-button
                      :loading="getLoading"
                      class="fw-bold"
                      primary
                      block
                      :disabled="!getFile('id-front')"
                      @click="sendDocument(form, 'front', getFile('id-front').file, ()=>{idFrontSent = true})"
                    >
                      {{ $t('i18n_enviar') }}
                    </fut-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 position-relative p-0">
              <div v-if="idBackSent" class="sended-message text-center">
                <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <font-awesome-icon class="ms-1" :icon="['fas', 'check']" /></span>
                <br>
                <fut-button class="text-dark" @click="idBackSent = false">
                  <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                </fut-button>
              </div>
              <div v-if="idBackSent" class="sended-bg" />
              <div class="p-3">
                <h4>{{ $t('i18n_verso_do_documento') }}</h4>
                <input
                  ref="idBack"
                  hidden
                  type="file"
                  accept="image/*,.pdf"
                  @change="event => changeFile('id-back', event)"
                >
                <fut-button class="btn file-input" @click="openFileInput('idBack')">
                  <img
                    v-if="getFile('id-back') && !getFile('id-back').src.includes('pdf;base64')"
                    style="object-fit: contain"
                    class="img-sender"
                    height="200px"
                    width="100%"
                    :src="getFile('id-back').src"
                  >
                  <font-awesome-icon v-if="getFile('id-back') && getFile('id-back').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                  <font-awesome-icon v-if="!getFile('id-back')" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                  <span>{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                </fut-button>
                <div class="row mt-2">
                  <div class="col-6">
                    <fut-button class="fw-bold" outline_primary block @click="modal.idBack = true">
                      {{ $t('i18n_exemplo') }}
                    </fut-button>
                  </div>
                  <div class="col-6">
                    <fut-button
                      :loading="getLoading"
                      class="fw-bold"
                      primary
                      block
                      :disabled="!getFile('id-back')"
                      @click="sendDocument(form, 'back', getFile('id-back').file, ()=>{idBackSent = true})"
                    >
                      {{ $t('i18n_enviar') }}
                    </fut-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item mb-2">
      <h2 id="flush-headingOne" class="accordion-header">
        <fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#residence">
          <font-awesome-icon class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'house-user']" /> {{ $t('i18n_comprovante_de_residencia') }}
        </fut-button>
      </h2>
      <div id="residence" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#documents-collapse">
        <div class="accordion-body ">
          <p
            v-for="message in errors?errors.form:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <p
            v-for="message in errors?errors.type:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <p
            v-for="message in errors?errors.file:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <div class="position-relative p-0">
            <div v-if="residenceSent" class="sended-message text-center">
              <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <font-awesome-icon class="ms-1" :icon="['fas', 'check']" /></span>
              <br>
              <fut-button class="text-dark" @click="residenceSent = false">
                <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
              </fut-button>
            </div>
            <div v-if="residenceSent" class="sended-bg" />
            <div class="p-3">
              <h4>{{ $t('i18n_foto_do_documento') }}</h4>
              <p><small>{{ $t('i18n_envie_um_comprovante_de_residencia') }}</small></p>
              <input
                ref="residence"
                hidden
                type="file"
                accept="image/*,.pdf"
                @change="event => changeFile('residence', event)"
              >
              <fut-button class="btn file-input fut-color-dynamic" @click="openFileInput('residence')">
                <img
                  v-if="getFile('residence') && !getFile('residence').src.includes('pdf;base64')"
                  style="object-fit: contain"
                  class="img-sender"
                  height="200px"
                  width="100%"
                  :src="getFile('residence').src"
                >
                <font-awesome-icon v-if="getFile('residence') && getFile('residence').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                <font-awesome-icon v-if="!getFile('residence')" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                <span>{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
              </fut-button>
              <div class="row mt-2">
                <div class="col-6">
                  <fut-button class="fw-bold" outline_primary block @click="modal.res = true">
                    {{ $t('i18n_exemplo') }}
                  </fut-button>
                </div>
                <div class="col-6">
                  <fut-button
                    :loading="getLoading"
                    class="fw-bold"
                    :disabled="!getFile('residence')"
                    primary
                    block
                    @click="sendDocument('residence', 'front', getFile('residence').file, ()=>{residenceSent = true})"
                  >
                    {{ $t('i18n_enviar') }}
                  </fut-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-background p-3 doc-info-card">
      <div class="d-flex">
        <img class="img-fluid me-3" src="/doc.png" width="60px" height="60px" style="object-fit: contain">
        <div class="header-title--text">
          <div class="title text-white fut-color-dynamic">
            {{ $t('i18n_documentos_adicionais') }}
          </div>
          <div class="sub-title text-white fut-color-dynamic">
            {{ $t('i18n_aqui_voce_pode_conferir_todos') }}
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 id="flush-headingOne" class="accordion-header">
        <fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#others">
          <font-awesome-icon class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'file-upload']" /> {{ $t('i18n_outro_documento') }}
        </fut-button>
      </h2>
      <div id="others" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#documents-collapse">
        <div class="accordion-body ">
          <p
            v-for="message in errors?errors.form:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <p
            v-for="message in errors?errors.type:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <p
            v-for="message in errors?errors.file:{}"
            :key="message"
            class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger"
          >
            {{ message }}
          </p>
          <div class="position-relative p-0">
            <div v-if="otherSent" class="sended-message text-center">
              <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <font-awesome-icon class="ms-1" :icon="['fas', 'check']" /></span>
              <br>
              <fut-button class="text-dark" @click="otherSent = false">
                <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
              </fut-button>
            </div>
            <div v-if="otherSent" class="sended-bg" />
            <div class="p-3">
              <h4>{{ $t('i18n_foto_do_documento') }}</h4>
              <input ref="other" hidden type="file" accept="image/*,.pdf" @change="event => changeFile('other', event)">
              <fut-button class="btn file-input" @click="openFileInput('other')">
                <img
                  v-if="getFile('other') && !getFile('other').src.includes('pdf;base64')"
                  style="object-fit: contain"
                  class="img-sender"
                  height="200px"
                  width="100%"
                  :src="getFile('other').src"
                >
                <font-awesome-icon v-if="getFile('other') && getFile('other').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                <font-awesome-icon v-if="!getFile('other')" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                <span>{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
              </fut-button>
              <div class="row mt-2">
                <div class="col-6">
                  <fut-button
                    :loading="getLoading"
                    class="fw-bold"
                    :disabled="!getFile('other')"
                    primary
                    block
                    @click="sendDocument('other', 'front', getFile('other').file, ()=>{otherSent = true})"
                  >
                    {{ $t('i18n_enviar') }}
                  </fut-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fut-modal
      class="text-center"
      :open="modal.idFront"
      :title="$t('i18n_documento_de_identificacao')"
      @onClose="()=>{ modal.idFront = false; }"
    >
      <p>{{ $t('i18n_antes_de_enviar_o_seu_documento') }}</p>
      <img src="/frente.png" class="img-fluid" alt="">
    </fut-modal>
    <fut-modal
      class="text-center"
      :open="modal.idBack"
      :title="$t('i18n_documento_de_identificacao')"
      @onClose="()=>{ modal.idBack = false; }"
    >
      <p>{{ $t('i18n_antes_de_enviar_o_seu_documento') }}</p>
      <img src="/verso.png" class="img-fluid" alt="">
    </fut-modal>
    <fut-modal
      class="text-start"
      :open="modal.res"
      :title="$t('i18n_documento_de_identificacao_de_residencia')"
      @onClose="()=>{ modal.res = false; }"
    >
      <div class="article-container">
        <p dir="ltr">
          {{ $t('i18n_todo_o_documento_deve_ser_visivel') }}:
        </p>
        <ol>
          <li>{{ $t('i18n_nome') }}</li>
          <li>{{ $t('i18n_endereco') }}&nbsp;</li>
          <li>{{ $t('i18n_nome_da_empresa_que_emitiu_o_documento') }}</li>
          <li>{{ $t('i18n_data_de_emissao') }} ({{ $t('i18n_com_menos_de_seis_meses') }})</li>
        </ol>
        <p dir="ltr">
          {{ $t('i18n_documentos_sugeridos_para_confirmacao') }}:
        </p>
        <ol>
          <li>{{ $t('i18n_faturas_domesticas_recenter') }} ({{ $t('i18n_emitidas_nos_ultimos_seis_meses', 2) }}) {{ $t('i18n_cuja_data_de_emissao_seja_visivel') }}</li>
          <li>{{ $t('i18n_extrato_bancario') }} ({{ $t('i18n_emitidas_nos_ultimos_seis_meses', 1) }})</li>
          <li>{{ $t('i18n_autorizacao_de_residencia_valida') }}</li>
          <li>{{ $t('i18n_certificado_de_resistencia_emitido') }}</li>
        </ol>
      </div>
    </fut-modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useUploadFileStore } from '@/stores/upload-file'

import FutButton from '@/components/default/atoms/FutButton'
import FutSelect from '@/components/default/atoms/FutSelect'
import FutModal from '@/components/default/organisms/FutModal'

// todo Add residence file
export default {
  name: 'FutDocuments',
  components: {
    FutButton,
    FutSelect,
    FutModal
  },
  props: {
    loggedInUser: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sending: false,
      form: null,
      /* 0 = error, 1 = sent */
      frontStatus: null,
      backStatus: null,
      selfieStatus: null,
      uploadedFiles: [],
      /* legacy */
      documentBack: null,
      documentFront: null,
      documentSelfie: null,
      /* current iteration */
      idFrontSent: false,
      idBackSent: false,
      residenceSent: false,
      otherSent: false,
      documents: [],
      errors: null,
      modal: {
        idFront: false,
        idBack: false,
        res: false,
        other: false
      },
      fileOptions: [
        { label: 'Habilitação', value: 'licence' },
        { label: 'Passaporte', value: 'passport' },
        { label: 'Identidade', value: 'id' }
      ]
    }
  },
  computed: {
    ...mapState(useUploadFileStore, {
      getLoading: 'getLoading'
    })
  },
  methods: {
    ...mapActions(useUploadFileStore, {
      sendFile: 'upload-file/sendFile'
    }),
    openFileInput (refValue) {
      const el = this.$refs[refValue]
      el.click()
    },
    getFormName (doc) {
      switch (doc) {
        case 'front':
          return this.$t('i18n_frente_do_documento')
        case 'back':
          return this.$t('i18n_verso_do_documento')
        case 'selfie':
          return 'Selfie'
        default:
          return doc
      }
    },
    getDocumentName (doc) {
      switch (doc) {
        case 'licence':
          return 'Habilitação'
        case 'id':
          return 'Identidade'
        case 'residence':
          return 'Comp. Residência'
        case 'other':
          return 'Outro'
        default:
          return doc
      }
    },
    formattedData (date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    async changeFile (fileId, event) {
      if (this.documents.find(element => element.fileId === fileId)) {
        this.documents.splice(this.documents.find(element => element.fileId === fileId).index, 1)
      }
      const base64 = await this.convertBase64(event.target.files[0])
      this.documents.push({ fileId, src: base64, file: event.target.files[0] })
    },
    getFile (fileId) {
      return this.documents.find(element => element.fileId === fileId)
    },
    sendDocument (form, type, file, callback) {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('type', type)
      formData.append('form', form)

      this.sendFile(formData).then(async () => {
        const base64 = await this.convertBase64(file)

        this.uploadedFiles.push({
          type,
          desc: form,
          created_at: new Date(),
          status_br: 'Enviado, Aguardando aprovação',
          file: base64
        })

        callback()
      })
    },
    convertBase64 (file) {
      if (!file) { return }
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }
    /* legacy */
    // async submitFiles () {
    //   const formData = new FormData()
    //   if (this.documentBack) {
    //     formData.append('files[]', this.documentBack)
    //   }
    //   if (this.documentFront) {
    //     formData.append('files[]', this.documentFront)
    //   }
    //   if (this.documentSelfie) {
    //     formData.append('files[]', this.documentSelfie)
    //   }
    //   /* eslint-disable-next-line */
    //   const [data, err] = await uploadService.submitAuthFiles(formData)
    //   if (err) {
    //     this.$toast.open({ message: 'Erro ao salvar as fotos enviadas!', type: 'warning' })
    //     return
    //   }
    //   this.$toast.open({ message: 'Arquivos enviados com sucesso!', type: 'success' })
    // },
    /* legaci down */
    // async onChangeFront (event) {
    //   const formData = new FormData()
    //   formData.append('file', event.target.files[0])
    //   formData.append('type', 'front')
    //   formData.append('form', this.form)
    //   /* eslint-disable-next-line */
    //   const [data, err] = await uploadService.submitAuthFiles(formData)
    //   if (err) {
    //     this.frontStatus = 0
    //     this.$toast.open({ message: 'Erro ao salvar a foto enviadas!', type: 'warning' })
    //     return
    //   }
    //   this.frontStatus = 1
    //   this.$toast.open({ message: 'Arquivo enviado com sucesso!', type: 'success' })
    //   const base64 = await this.convertBase64(event.target.files[0])
    //   this.uploadedFiles.push({
    //     type: 'front',
    //     desc: this.form,
    //     status_br: 'Enviado, Aguardando aprovação',
    //     file: base64
    //   })
    // },
    // async onChangeBack (event) {
    //   const formData = new FormData()
    //   formData.append('file', event.target.files[0])
    //   formData.append('type', 'back')
    //   formData.append('form', this.form)
    //   /* eslint-disable-next-line */
    //   const [data, err] = await uploadService.submitAuthFiles(formData)
    //   if (err) {
    //     this.backStatus = 0
    //     this.$toast.open({ message: 'Erro ao salvar a foto enviadas!', type: 'warning' })
    //     return
    //   }
    //   this.backStatus = 1
    //   this.$toast.open({ message: 'Arquivo enviado com sucesso!', type: 'success' })
    //   const base64 = await this.convertBase64(event.target.files[0])
    //   this.uploadedFiles.push({
    //     type: 'front',
    //     desc: this.form,
    //     status_br: 'Enviado, Aguardando aprovação',
    //     file: base64
    //   })
    // },
    // async onChangeSelfie (event) {
    //   const formData = new FormData()
    //   formData.append('file', event.target.files[0])
    //   formData.append('type', 'selfie')
    //   formData.append('form', this.form)
    //   /* eslint-disable-next-line */
    //   const [data, err] = await uploadService.submitAuthFiles(formData)
    //   if (err) {
    //     this.selfieStatus = 0
    //     this.$toast.open({ message: 'Erro ao salvar a foto enviadas!', type: 'warning' })
    //     return
    //   }
    //   this.selfieStatus = 1
    //   this.$toast.open({ message: 'Arquivo enviado com sucesso!', type: 'success' })
    //   const base64 = await this.convertBase64(event.target.files[0])
    //   this.uploadedFiles.push({
    //     type: 'front',
    //     desc: this.form,
    //     status_br: 'Enviado, Aguardando aprovação',
    //     file: base64
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
.sended{
  opacity: .5;
}
.cover{
  object-fit: cover;
  border-radius: 7px;
}
.img-document{
  opacity: .7;
  max-height: 300px;
}
.accordion-button{
  background-color: var(--fut-background);
  font-size: 20px;
  font-weight: 700;
  // box-shadow: 0 1px 3px rgb(0, 0, 0/25);
  box-shadow: 0 1px 3px rgb(0, 0, math.div(0, 25));
  border: 1px solid var(--fut-background-lighter);
}
.doc-info-card{
  border: 1px solid var(--fut-background-lighter);
}
.accordion-item{
  border-bottom: 0;
}
.title{
  font-size: 18px;
  font-weight: 700;
}
.sub-title{
  font-size: 14px;
  font-weight: 400;
}
.file-input{
  border: 2px dashed white;
  padding: 10px;
  span{
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: white;
  }
}
.icon-file{
  font-size: 50px;
  display: block;
  margin-left: auto !important;
  margin-right: auto !important;
}
.sended-message{
  background: white;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}
.sended-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  opacity: .3;
}
</style>
