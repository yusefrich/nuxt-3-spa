<template>
  <div class="sk-documents">
    <sk-card>
      <div class="info">
        <div class="container-fluid p-0">
          <div id="documents-collapse" class="accordion accordion-flush">
            <div class="accordion-item mb-2">
              <h2 id="sended" class="accordion-header">
                <fb-fut-button
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#sended-collapse"
                >
                  <font-awesome-icon class="fut-color-dynamic icon me-2" :icon="['fas', 'file-alt']" />
                  <div class="d-flex justify-content-between w-100">
                    <span>{{ $t('i18n_documentos_enviados') }}</span>
                    <small class="me-3 badge bg-secondary rounded">
                      {{ +loggedInUser.player.files.length + +uploadedFiles.length }}
                    </small>
                  </div>
                </fb-fut-button>
              </h2>
              <div
                id="sended-collapse"
                class="accordion-collapse collapse"
                aria-labelledby="sended"
                data-bs-parent="#documents-collapse"
              >
                <div class="accordion-body">
                  <div class="document-list-to-send">
                    <table class="table fut-color-dynamic">
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
                        <tr
                          v-for="file in loggedInUser.player.files"
                          :key="'file_key_'+file.id"
                        >
                          <th scope="row">
                            {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                          </th>
                          <td>
                            {{ formattedData(file.created_at) }}
                          </td>
                          <td>
                            <span
                              class="badge"
                              :class="[file.status_br === 'Reprovado' ? 'bg-danger' : '', file.status_br === 'Aprovado' ? 'bg-success' : '', file.status_br === 'Aguardando Aprovação' ? 'bg-secondary' : '']"
                            >
                              {{ file.status_br }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="uploadedFiles">
                        <tr
                          v-for="file in uploadedFiles"
                          :key="'file_key_'+file.id"
                        >
                          <th scope="row">
                            {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                          </th>
                          <td>
                            {{ formattedData(file.created_at) }}
                          </td>
                          <td>
                            <span
                              class="badge"
                              :class="[file.status_br === 'Reprovado' ? 'bg-danger' : '', file.status_br === 'Aprovado' ? 'bg-success' : '', file.status_br === 'Aguardando Aprovação' ? 'bg-secondary' : '']"
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
            <div class="p-3 doc-info-card">
              <div class="d-flex">
                <img
                  class="img-fluid me-3"
                  src="/id.png"
                  width="60"
                  height="60"
                  style="object-fit: contain"
                >
                <div class="header-title--text">
                  <div class="title fut-color-dynamic">
                    {{ $t('i18n_processo_de_verificacao') }}
                  </div>
                  <div class="sub-title fut-color-dynamic">
                    {{ $t('i18n_para_completar_o_processo') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 id="flush-headingOne" class="accordion-header">
                <fb-fut-button
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#doc-id"
                >
                  <font-awesome-icon
                    class="fut-color-dynamic icon me-2"
                    :icon="['far', 'id-card']"
                  />
                  {{ $t('i18n_documento_de_identificacao') }}
                </fb-fut-button>
              </h2>
              <div
                id="doc-id"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#documents-collapse"
              >
                <div class="accordion-body">
                  <select
                    id="docType"
                    v-model="form"
                    name="form"
                    class="select-control"
                  >
                    <option
                      v-for="(item, idx) in fileOptions"
                      :key="idx"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                  <p v-for="message in errors?errors.type:{}" :key="message" class="fut-color-dynamic mb-1 pb-1 badge bg-danger">
                    {{ message }}
                  </p>
                  <p v-for="message in errors?errors.file:{}" :key="message" class="fut-color-dynamic mb-1 pb-1 badge bg-danger">
                    {{ message }}
                  </p>
                  <div v-if="form" class="row mx-0">
                    <div class="col-md-6 position-relative p-0">
                      <div
                        v-if="idFrontSent"
                        class="sended-message text-center"
                      >
                        <span class="text-dark fw-bold">
                          {{ $t('i18n_enviado_com_sucesso') }}
                          <font-awesome-icon class="ms-1" :icon="['fas', 'check']" />
                        </span>
                        <br>
                        <fb-fut-button
                          class="text-dark"
                          @click="idFrontSent = false"
                        >
                          <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                        </fb-fut-button>
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
                        <fb-fut-button
                          class="btn file-input"
                          @click="openFileInput('idFront')"
                        >
                          <img
                            v-if="getFile('id-front') && !getFile('id-front').src.includes('pdf;base64')"
                            style="object-fit: contain"
                            class="img-sender w-100"
                            height="200"
                            :src="getFile('id-front').src"
                          >
                          <font-awesome-icon
                            v-if="getFile('id-front') && getFile('id-front').src.includes('pdf;base64')"
                            class="fut-color-dynamic icon-file me-2"
                            :icon="['fas', 'file-pdf']"
                          />
                          <font-awesome-icon
                            v-if="!getFile('id-front')"
                            class="fut-color-dynamic icon-file me-2"
                            :icon="['far', 'plus-square']"
                          />
                          <span>
                            {{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}
                          </span>
                        </fb-fut-button>
                        <div class="row mt-2">
                          <div class="col-6">
                            <md-button
                              class="fw-bold"
                              outline
                              width="100%"
                              @click="modal.idFront = true"
                            >
                              {{ $t('i18n_exemplo') }}
                            </md-button>
                          </div>
                          <div class="col-6">
                            <md-button
                              :loading="getLoading"
                              class="fw-bold"
                              width="100%"
                              :disabled="!getFile('id-front')"
                              @click="sendDocument(form, 'front', getFile('id-front').file, ()=>{idFrontSent = true})"
                            >
                              {{ $t('i18n_enviar') }}
                            </md-button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 position-relative p-0">
                      <div
                        v-if="idBackSent"
                        class="sended-message text-center"
                      >
                        <span class="text-dark fw-bold">
                          {{ $t('i18n_enviado_com_sucesso') }}
                          <font-awesome-icon class="ms-1" :icon="['fas', 'check']" />
                        </span>
                        <br>
                        <fb-fut-button
                          class="text-dark"
                          @click="idBackSent = false"
                        >
                          <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                        </fb-fut-button>
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
                        <fb-fut-button class="btn file-input" @click="openFileInput('idBack')">
                          <img
                            v-if="getFile('id-back') && !getFile('id-back').src.includes('pdf;base64')"
                            style="object-fit: contain"
                            class="img-sender w-100"
                            height="200"
                            :src="getFile('id-back').src"
                          >
                          <font-awesome-icon
                            v-if="getFile('id-back') && getFile('id-back').src.includes('pdf;base64')"
                            class="fut-color-dynamic icon-file me-2"
                            :icon="['fas', 'file-pdf']"
                          />
                          <font-awesome-icon
                            v-if="!getFile('id-back')"
                            class="fut-color-dynamic icon-file me-2"
                            :icon="['far', 'plus-square']"
                          />
                          <span>
                            {{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}
                          </span>
                        </fb-fut-button>
                        <div class="row mt-2">
                          <div class="col-6">
                            <md-button
                              class="fw-bold"
                              outline
                              width="100%"
                              @click="modal.idBack = true"
                            >
                              {{ $t('i18n_exemplo') }}
                            </md-button>
                          </div>
                          <div class="col-6">
                            <md-button
                              :loading="getLoading"
                              :disabled="!getFile('id-back')"
                              class="fw-bold"
                              width="100%"
                              @click="sendDocument(form, 'back', getFile('id-back').file, ()=>{idBackSent = true})"
                            >
                              {{ $t('i18n_enviar') }}
                            </md-button>
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
                <fb-fut-button
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#residence"
                >
                  <font-awesome-icon
                    class="fut-color-dynamic icon me-2"
                    :icon="['fas', 'house-user']"
                  />
                  {{ $t('i18n_comprovante_de_residencia') }}
                </fb-fut-button>
              </h2>
              <div
                id="residence"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#documents-collapse"
              >
                <div class="accordion-body">
                  <p
                    v-for="message in errors?errors.form:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <p
                    v-for="message in errors?errors.type:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <p
                    v-for="message in errors?errors.file:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <div class="position-relative p-0">
                    <div
                      v-if="residenceSent"
                      class="sended-message text-center"
                    >
                      <span class="text-dark fw-bold">
                        {{ $t('i18n_enviado_com_sucesso') }}
                        <font-awesome-icon class="ms-1" :icon="['fas', 'check']" />
                      </span>
                      <br>
                      <fb-fut-button
                        class="text-dark"
                        @click="residenceSent = false"
                      >
                        <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                      </fb-fut-button>
                    </div>
                    <div v-if="residenceSent" class="sended-bg" />
                    <div class="p-3">
                      <h4>{{ $t('i18n_foto_do_documento') }}</h4>
                      <p>
                        <small>
                          {{ $t('i18n_envie_um_comprovante_de_residencia') }}
                        </small>
                      </p>
                      <input
                        ref="residence"
                        hidden
                        type="file"
                        accept="image/*,.pdf"
                        @change="event => changeFile('residence', event)"
                      >
                      <fb-fut-button
                        class="btn file-input fut-color-dynamic"
                        @click="openFileInput('residence')"
                      >
                        <img
                          v-if="getFile('residence') && !getFile('residence').src.includes('pdf;base64')"
                          style="object-fit: contain"
                          class="img-sender w-100"
                          height="200"
                          :src="getFile('residence').src"
                        >
                        <font-awesome-icon
                          v-if="getFile('residence') && getFile('residence').src.includes('pdf;base64')"
                          class="fut-color-dynamic icon-file me-2"
                          :icon="['fas', 'file-pdf']"
                        />
                        <font-awesome-icon
                          v-if="!getFile('residence')"
                          class="fut-color-dynamic icon-file me-2"
                          :icon="['far', 'plus-square']"
                        />
                        <span>
                          {{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}
                        </span>
                      </fb-fut-button>
                      <div class="row mt-2">
                        <div class="col-6">
                          <md-button
                            class="fw-bold action-btn"
                            outline
                            width="100%"
                            @click="modal.res = true"
                          >
                            {{ $t('i18n_exemplo') }}
                          </md-button>
                        </div>
                        <div class="col-6">
                          <md-button
                            :loading="getLoading"
                            class="fw-bold action-btn"
                            width="100%"
                            :disabled="!getFile('residence')"
                            @click="sendDocument('residence', 'front', getFile('residence').file, ()=>{residenceSent = true})"
                          >
                            {{ $t('i18n_enviar') }}
                          </md-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-3 doc-info-card">
              <div class="d-flex">
                <img
                  class="img-fluid me-3"
                  src="/doc.png"
                  width="60"
                  height="60"
                  style="object-fit: contain"
                >
                <div class="header-title--text">
                  <div class="title fut-color-dynamic">
                    {{ $t('i18n_documentos_adicionais') }}
                  </div>
                  <div class="sub-title fut-color-dynamic">
                    {{ $t('i18n_aqui_voce_pode_conferir_todos') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 id="flush-headingOne" class="accordion-header">
                <fb-fut-button
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#others"
                >
                  <font-awesome-icon
                    class="fut-color-dynamic icon me-2"
                    :icon="['fas', 'file-upload']"
                  />
                  {{ $t('i18n_outro_documento') }}
                </fb-fut-button>
              </h2>
              <div
                id="others"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#documents-collapse"
              >
                <div class="accordion-body ">
                  <p
                    v-for="message in errors?errors.form:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <p
                    v-for="message in errors?errors.type:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <p
                    v-for="message in errors?errors.file:{}"
                    :key="message"
                    class="fut-color-dynamic mb-1 pb-1 badge bg-danger"
                  >
                    {{ message }}
                  </p>
                  <div class="position-relative p-0">
                    <div v-if="otherSent" class="sended-message text-center">
                      <span class="text-dark fw-bold">
                        {{ $t('i18n_enviado_com_sucesso') }}
                        <font-awesome-icon class="ms-1" :icon="['fas', 'check']" />
                      </span>
                      <br>
                      <fb-fut-button
                        class="text-dark"
                        @click="otherSent = false"
                      >
                        <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                      </fb-fut-button>
                    </div>
                    <div v-if="otherSent" class="sended-bg" />
                    <div class="p-3">
                      <h4>{{ $t('i18n_foto_do_documento') }}</h4>
                      <input
                        ref="other"
                        hidden
                        type="file"
                        accept="image/*,.pdf"
                        @change="event => changeFile('other', event)"
                      >
                      <fb-fut-button
                        class="btn file-input"
                        @click="openFileInput('other')"
                      >
                        <img
                          v-if="getFile('other') && !getFile('other').src.includes('pdf;base64')"
                          style="object-fit: contain"
                          class="img-sender w-100"
                          height="200"
                          :src="getFile('other').src"
                        >
                        <font-awesome-icon
                          v-if="getFile('other') && getFile('other').src.includes('pdf;base64')"
                          class="fut-color-dynamic icon-file me-2"
                          :icon="['fas', 'file-pdf']"
                        />
                        <font-awesome-icon
                          v-if="!getFile('other')"
                          class="fut-color-dynamic icon-file me-2"
                          :icon="['far', 'plus-square']"
                        />
                        <span>
                          {{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}
                        </span>
                      </fb-fut-button>
                      <div class="row mt-2">
                        <div class="col-6">
                          <md-button
                            :loading="getLoading"
                            class="fw-bold action-btn"
                            width="100%"
                            :disabled="!getFile('other')"
                            @click="sendDocument('other', 'front', getFile('other').file, ()=>{otherSent = true})"
                          >
                            {{ $t('i18n_enviar') }}
                          </md-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <sk-modal
              v-model="modal.idFront"
              close
            >
              <h6 class="m-4 article-container">
                {{ $t('i18n_documento_de_identificacao') }}
              </h6>
              <div class="mx-4 text-center article-container">
                <p>
                  {{ $t('i18n_antes_de_enviar_o_seu_documento') }}
                </p>
                <img src="/frente.png" class="img-fluid" alt="">
              </div>
            </sk-modal>
            <sk-modal
              v-model="modal.idBack"
              close
            >
              <h6 class="m-4 article-container">
                {{ $t('i18n_documento_de_identificacao') }}
              </h6>
              <div class="mx-4 text-center article-container">
                <p>
                  {{ $t('i18n_antes_de_enviar_o_seu_documento') }}
                </p>
                <img src="/verso.png" class="img-fluid" alt="">
              </div>
            </sk-modal>
            <sk-modal
              v-model="modal.res"
              close
            >
              <h6 class="m-4 article-container">
                {{ $t('i18n_documento_de_identificacao_de_residencia') }}
              </h6>
              <div class="mx-4 article-container">
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
            </sk-modal>
          </div>
        </div>
      </div>
    </sk-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useUploadFileStore } from '@/stores/upload-file'

import SkCard from '@/components/sk/atoms/SkCard'
import SkModal from '@/components/sk/atoms/SkModal'

export default {
  name: 'SkDocuments',
  components: {
    SkCard,
    SkModal
  },
  data () {
    return {
      form: '',
      uploadedFiles: [],
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
        { label: this.$t('i18n_selecionar_tipo_do_documento'), value: '' },
        { label: 'Habilitação', value: 'licence' },
        { label: 'Passaporte', value: 'passport' },
        { label: 'Identidade', value: 'id' }
      ]
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
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
  }
}
</script>

<style lang="scss" scoped>
.sk-documents {
  padding: 1.5rem;
  background: var(--fut-background-darkest);
  border-radius: .5rem;
  color: var(--fut-color-dynamic);

  .info {
    padding: 1.5rem;
    color: var(--fut-color-dynamic);

    .accordion {
      .accordion-item{
        border-bottom: 0;

        .accordion-button{
          background-color: var(--fut-background-darkest);
          padding: 13px 20px;
          font-size: 1rem;
          font-weight: 600;
          border: 1px solid var(--fut-background-lightest);
          border-radius: .25rem;
          color: var(--fut-color-dynamic);
        }
        .accordion-collapse {
          background: var(--fut-secondary);
          border: 1px solid var(--fut-background-lightest-2);
          color: var(--fut-color-dynamic);
          border-radius: .25rem;
        }
        .select-control {
          border: 1px solid var(--fut-background-lightest-2);
          background: var(--fut-background-white-3);
          color: var(--fut-color-dynamic);
          box-shadow: 0 0 0 0;
          width: 100%;
          padding: 8px;
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
          background: var(--fut-background-white-3);
          opacity: .3;
        }
        .file-input{
          border: 2px dashed var(--fut-color-dynamic);
          padding: 10px;
          span{
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            color: var(--fut-color-dynamic);
          }
        }
        .action-btn {
          font-size: 16px;
          padding: 7px;
        }
        .icon-file{
          font-size: 50px;
          display: block;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }

      .doc-info-card{
        color: var(--fut-color-dynamic);

        .title{
          font-size: 18px;
          font-weight: 600;
        }
        .sub-title{
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
.badge {
  color: var(--fut-color-dynamic);
}

@media (max-width: 821px) {
  .sk-documents {
    padding: .5rem;

    .info {
      padding: .5rem;
    }
  }
}
</style>
