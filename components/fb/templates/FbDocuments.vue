<template>
  <div class="d-flex justify-content-center">
    <div class="profile-content" :class="{'w-100': fill}">
      <div
        class="header-profile w-100 p-2 d-none d-md-flex align-items-center text-white fut-color-dynamic"
      >
        <fa class="mr-10" :icon="['fas', 'user']" />
        <span>{{ $t('i18n_perfil') }}</span>
      </div>
      <div class="mt-md-1 mt-3">
        <div class="section-details w-100 me-md-1 me-0">
          <div class="container py-1 section-details-header d-none d-md-flex align-items-center fut-color-dynamic">
            <fa class="mr-10" :icon="['fas', 'address-book']" />
            <span>{{ $t('i18n_documentos_de_identificacao') }}</span>
          </div>
          <div class="d-md-none p-2 section-details-header">
            <span class="mobile-header">{{ $t('i18n_documentos') }}</span>
          </div>
          <div class="contianer-fluid p-2">
            <div id="documents-collapse" class="accordion accordion-flush">
              <div class="accordion-item mb-2">
                <h2 id="sended" class="accordion-header">
                  <fb-fut-button
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#sended-collapse"
                  >
                    <fa class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'file-alt']" />
                    <div class="d-flex justify-content-between w-100">
                      <span class="fut-color-dynamic">{{ $t('i18n_documentos_enviados') }}</span>
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
                          <tr
                            v-for="file in loggedInUser.player.files"
                            :key="'file_key_'+file.id"
                          >
                            <td scope="row">
                              {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                            </td>
                            <td>{{ formattedData(file.created_at) }}</td>
                            <td class="bet-status">
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
                          <tr
                            v-for="file in uploadedFiles"
                            :key="'file_key_'+file.id"
                          >
                            <td scope="row">
                              {{ getDocumentName(file.desc ? file.desc : 'Outro') }} / {{ getFormName(file.type ? file.type : 'Outro') }}
                            </td>
                            <td>{{ formattedData(file.created_at) }}</td>
                            <td class="bet-status">
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
                  <fb-fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#doc-id">
                    <fa class="text-white fut-color-dynamic icon me-2" :icon="['far', 'id-card']" /> {{ $t('i18n_documento_de_identificacao') }}
                  </fb-fut-button>
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
                    <p v-for="message in errors?errors.type:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <p v-for="message in errors?errors.file:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <div v-if="form" class="row mx-0">
                      <div class="col-md-6 position-relative p-0">
                        <!-- <div v-if="idFrontSent" class="sended-message text-center">
                          <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <fa class="ms-1" :icon="['fas', 'check']" /></span>
                          <br>
                          <fb-fut-button class="text-dark" @click="idFrontSent = false">
                            <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                          </fb-fut-button>
                        </div> -->
                        <div v-if="(idFrontSent || getFilesFiltered(form, 'front')) && !idFrontSent2" class="sended-message text-center">
                          <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <fa class="ms-1" :icon="['fas', 'check']" /></span>
                          <br>
                          <span class="text-dark"><small>{{formattedData(getFilesFiltered(form, 'front') ? getFilesFiltered(form, 'front').created_at : new Date())}}</small></span>
                          <br>
                          <span
                            v-if="!idFrontSent && getFilesFiltered(form, 'front')"
                            class="badge"
                            :class="[
                              getFilesFiltered(form, 'front').status_br === 'Reprovado' ? 'bg-danger' : '',
                              getFilesFiltered(form, 'front').status_br === 'Aprovado' ? 'bg-success' : '',
                              getFilesFiltered(form, 'front').status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                            ]"
                          >
                            {{ getFilesFiltered(form, 'front').status_br }}
                          </span>
                          <br>
                          <!-- <span class="text-dark"><small>{{formattedData(getFilesFiltered('other', 'front').created_at)}}</small></span> -->
                          <fb-fut-button v-if="(getFilesFiltered(form, 'front') && getFilesFiltered(form, 'front').status_br === 'Reprovado' && !idFrontSent) || currentSettings.dynamic_document === 0" class="text-dark btn-sent" @click="()=>{idFrontSent = false; idFrontSent2 = true}">
                            <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                          </fb-fut-button>
                        </div>
                        <div v-if="(idFrontSent || getFilesFiltered(form, 'front')) && !idFrontSent2" class="sended-bg" />
                        <!-- <div v-if="idFrontSent" class="sended-bg" /> -->
                        <div class="p-3 fut-color-dynamic">
                          <h4>{{ $t('i18n_frente_do_documento') }}</h4>
                          <input
                            ref="idFront"
                            hidden
                            type="file"
                            accept="image/*,.pdf"
                            @change="event => changeFile('id-front', event)"
                          >
                          <fb-fut-button class="btn file-input" @click="openFileInput('idFront')">
                            <img
                              v-if="getFile('id-front') && !getFile('id-front').src.includes('pdf;base64')"
                              style="object-fit: contain"
                              class="img-sender"
                              height="200px"
                              width="100%"
                              :src="getFile('id-front').src"
                            >
                            <img
                              v-else-if="getFilesFiltered(form, 'front') && !idFrontSent2"
                              style="object-fit: contain"
                              class="img-sender"
                              height="200px"
                              width="100%"
                              :src="getFilesFiltered(form, 'front').file"
                            >
                            <fa v-if="getFile('id-front') && getFile('id-front').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                            <fa v-if="(!getFile('id-front') && !getFilesFiltered('id-front', 'front')) || (idFrontSent2 && !getFile('id-front'))" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                            <span class="fut-color-dynamic">{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                          </fb-fut-button>
                          <div class="row mt-2">
                            <div class="col-6">
                              <fb-fut-button class="fw-bold" outline_primary block @click="modal.idFront = true">
                                {{ $t('i18n_exemplo') }}
                              </fb-fut-button>
                            </div>
                            <div class="col-6">
                              <fb-fut-button
                                :loading="getLoading"
                                class="fw-bold"
                                primary
                                block
                                :disabled="!getFile('id-front')"
                                @click="sendDocument(form, 'front', getFile('id-front').file, ()=>{idFrontSent = true; idFrontSent2 = false})"
                              >
                                {{ $t('i18n_enviar') }}
                              </fb-fut-button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 position-relative p-0">
                        <div v-if="(idBackSent || getFilesFiltered(form, 'back')) && !idBackSent2" class="sended-message text-center">
                          <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <fa class="ms-1" :icon="['fas', 'check']" /></span>
                          <br>
                          <span class="text-dark"><small>{{formattedData(getFilesFiltered(form, 'back') ? getFilesFiltered(form, 'back').created_at : new Date())}}</small></span>
                          <br>
                          <span
                            v-if="!idBackSent && getFilesFiltered(form, 'back')"
                            class="badge"
                            :class="[
                              getFilesFiltered(form, 'back').status_br === 'Reprovado' ? 'bg-danger' : '',
                              getFilesFiltered(form, 'back').status_br === 'Aprovado' ? 'bg-success' : '',
                              getFilesFiltered(form, 'back').status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                            ]"
                          >
                            {{ getFilesFiltered(form, 'back').status_br }}
                          </span>
                          <br>
                          <fb-fut-button v-if="(getFilesFiltered(form, 'back') && getFilesFiltered(form, 'back').status_br === 'Reprovado' && !idBackSent) || currentSettings.dynamic_document === 0" class="text-dark btn-sent" @click="()=>{idBackSent = false; idBackSent2 = true}">
                            <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                          </fb-fut-button>
                        </div>
                        <div v-if="(idBackSent || getFilesFiltered(form, 'back')) && !idBackSent2" class="sended-bg" />
                        <div class="p-3 fut-color-dynamic">
                          <h4 class="fut-color-dynamic">
                            {{ $t('i18n_verso_do_documento') }}
                          </h4>
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
                              class="img-sender"
                              height="200px"
                              width="100%"
                              :src="getFile('id-back').src"
                            >
                            <img
                              v-else-if="getFilesFiltered(form, 'back') && !idBackSent2"
                              style="object-fit: contain"
                              class="img-sender"
                              height="200px"
                              width="100%"
                              :src="getFilesFiltered(form, 'back').file"
                            >
                            <fa v-if="getFile('id-back') && getFile('id-back').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                            <fa v-if="(!getFile('id-back') && !getFilesFiltered(form, 'back')) || (idBackSent2 && !getFile('id-back'))" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                            <span class="fut-color-dynamic">{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                          </fb-fut-button>
                          <div class="row mt-2">
                            <div class="col-6">
                              <fb-fut-button class="fw-bold" outline_primary block @click="modal.idBack = true">
                                {{ $t('i18n_exemplo') }}
                              </fb-fut-button>
                            </div>
                            <div class="col-6">
                              <fb-fut-button
                                :loading="getLoading"
                                :disabled="!getFile('id-back')"
                                class="fw-bold"
                                primary
                                block
                                @click="sendDocument(form, 'back', getFile('id-back').file, ()=>{idBackSent = true; idBackSent2 = false})"
                              >
                                {{ $t('i18n_enviar') }}
                              </fb-fut-button>
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
                  <fb-fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#residence">
                    <fa class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'house-user']" /> {{ $t('i18n_comprovante_de_residencia') }}
                  </fb-fut-button>
                </h2>
                <div id="residence" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#documents-collapse">
                  <div class="accordion-body ">
                    <p v-for="message in errors?errors.form:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <p v-for="message in errors?errors.type:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <p v-for="message in errors?errors.file:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <div class="position-relative p-0">
                      <div v-if="(residenceSent || getFilesFiltered('residence', 'front')) && !residenceSent2" class="sended-message text-center">
                        <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <fa class="ms-1" :icon="['fas', 'check']" /></span>
                        <br>
                        <span class="text-dark"><small>{{formattedData(getFilesFiltered('residence', 'front') ? getFilesFiltered('residence', 'front').created_at : new Date())}}</small></span>
                        <br>
                        <span
                          v-if="!residenceSent && getFilesFiltered('residence', 'front')"
                          class="badge"
                          :class="[
                            getFilesFiltered('residence', 'front').status_br === 'Reprovado' ? 'bg-danger' : '',
                            getFilesFiltered('residence', 'front').status_br === 'Aprovado' ? 'bg-success' : '',
                            getFilesFiltered('residence', 'front').status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                          ]"
                        >
                          {{ getFilesFiltered('residence', 'front').status_br }}
                        </span>
                        <br>
                        <fb-fut-button v-if="(getFilesFiltered('residence', 'front') && getFilesFiltered('residence', 'front').status_br === 'Reprovado' && !residenceSent) || currentSettings.dynamic_document === 0" class="text-dark btn-sent" @click="()=>{residenceSent = false; residenceSent2 = true}">
                          <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                        </fb-fut-button>
                      </div>
                      <div v-if="(residenceSent || getFilesFiltered('residence', 'front')) && !residenceSent2" class="sended-bg" />
                      <div class="p-3">
                        <h4 class="fut-color-dynamic">
                          {{ $t('i18n_foto_do_documento') }}
                        </h4>
                        <p class="fut-color-dynamic">
                          <small>{{ $t('i18n_envie_um_comprovante_de_residencia') }}</small>
                        </p>
                        <input
                          ref="residence"
                          hidden
                          type="file"
                          accept="image/*,.pdf"
                          @change="event => changeFile('residence', event)"
                        >
                        <fb-fut-button class="btn file-input fut-color-dynamic" @click="openFileInput('residence')">
                          <img
                            v-if="getFile('residence') && !getFile('residence').src.includes('pdf;base64')"
                            style="object-fit: contain"
                            class="img-sender"
                            height="200px"
                            width="100%"
                            :src="getFile('residence').src"
                          >
                          <img
                            v-else-if="getFilesFiltered('residence', 'front') && !residenceSent2"
                            style="object-fit: contain"
                            class="img-sender"
                            height="200px"
                            width="100%"
                            :src="getFilesFiltered('residence', 'front').file"
                          >
                          <fa v-if="getFile('residence') && getFile('residence').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                          <fa v-if="(!getFile('residence') && !getFilesFiltered('residence', 'front')) || (residenceSent2 && !getFile('residence'))" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                          <span class="fut-color-dynamic">{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                        </fb-fut-button>
                        <div class="row mt-2">
                          <div class="col-6">
                            <fb-fut-button class="fw-bold action-btn" outline_primary block @click="modal.res = true">
                              {{ $t('i18n_exemplo') }}
                            </fb-fut-button>
                          </div>
                          <div class="col-6">
                            <fb-fut-button
                              :loading="getLoading"
                              class="fw-bold action-btn"
                              :disabled="!getFile('residence')"
                              primary
                              block
                              @click="sendDocument('residence', 'front', getFile('residence').file, ()=>{residenceSent = true; residenceSent2 = false})"
                            >
                              {{ $t('i18n_enviar') }}
                            </fb-fut-button>
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
                  <fb-fut-button class="accordion-button collapsed fut-color-dynamic" data-bs-toggle="collapse" data-bs-target="#others">
                    <fa class="text-white fut-color-dynamic icon me-2" :icon="['fas', 'file-upload']" /> {{ $t('i18n_outro_documento') }}
                  </fb-fut-button>
                </h2>
                <div id="others" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#documents-collapse">
                  <div class="accordion-body ">
                    <p v-for="message in errors?errors.form:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <p v-for="message in errors?errors.type:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <p v-for="message in errors?errors.file:{}" :key="message" class="text-white fut-color-dynamic mb-1 pb-1 badge bg-danger">
                      {{ message }}
                    </p>
                    <div class="position-relative p-0">
                      <div v-if="(otherSent || getFilesFiltered('other', 'front')) && !otherSent2" class="sended-message text-center">
                        <span class="text-dark fw-bold">{{ $t('i18n_enviado_com_sucesso') }} <fa class="ms-1" :icon="['fas', 'check']" /></span>
                        <br>
                        <span class="text-dark"><small>{{formattedData(getFilesFiltered('other', 'front').created_at)}}</small></span>
                        <span class="text-dark"><small>{{formattedData(getFilesFiltered('other', 'front') ? getFilesFiltered('other', 'front').created_at : new Date())}}</small></span>
                        <br>
                        <span
                          v-if="!otherSent && getFilesFiltered('other', 'front')"
                          class="badge"
                          :class="[
                            getFilesFiltered('other', 'front').status_br === 'Reprovado' ? 'bg-danger' : '',
                            getFilesFiltered('other', 'front').status_br === 'Aprovado' ? 'bg-success' : '',
                            getFilesFiltered('other', 'front').status_br === 'Aguardando Aprovação' ? 'bg-secondary' : ''
                          ]"
                        >
                          {{ getFilesFiltered('other', 'front').status_br }}
                        </span>
                        <br>
                        <!-- <span class="text-dark"><small>{{formattedData(getFilesFiltered('other', 'front').created_at)}}</small></span> -->
                        <fut-button v-if="(getFilesFiltered('other', 'front') && getFilesFiltered('other', 'front').status_br === 'Reprovado' && !otherSent) || currentSettings.dynamic_document === 0" class="text-dark btn-sent" @click="()=>{otherSent = false; otherSent2 = true}">
                          <small>{{ $t('i18n_enviar_um_novo_arquivo') }}</small>
                        </fut-button>
                      </div>
                      <div v-if="(otherSent || getFilesFiltered('other', 'front')) && !otherSent2" class="sended-bg" />
                      <div class="p-3">
                        <h4 class="fut-color-dynamic">
                          {{ $t('i18n_foto_do_documento') }}
                        </h4>
                        <input
                          ref="other"
                          hidden
                          type="file"
                          accept="image/*,.pdf"
                          @change="event => changeFile('other', event)"
                        >
                        <fb-fut-button class="btn file-input" @click="openFileInput('other')">
                          <img
                            v-if="getFile('other') && !getFile('other').src.includes('pdf;base64')"
                            style="object-fit: contain"
                            class="img-sender"
                            height="200px"
                            width="100%"
                            :src="getFile('other').src"
                          >
                          <img
                            v-else-if="getFilesFiltered('other', 'front') && !otherSent2"
                            style="object-fit: contain"
                            class="img-sender"
                            height="200px"
                            width="100%"
                            :src="getFilesFiltered('other', 'front').file"
                          >
                          <fa v-if="getFile('other') && getFile('other').src.includes('pdf;base64')" class="text-white fut-color-dynamic icon-file me-2" :icon="['fas', 'file-pdf']" />
                          <fa v-if="(!getFile('other') && !getFilesFiltered('other', 'front')) || (otherSent2 && !getFile('other'))" class="text-white fut-color-dynamic icon-file me-2" :icon="['far', 'plus-square']" />
                          <span class="fut-color-dynamic">{{ $t('i18n_escolha_os_documentos_e_clique_em_enviar') }}</span>
                        </fb-fut-button>
                        <div class="row mt-2">
                          <div class="col-6">
                            <fb-fut-button
                              :loading="getLoading"
                              class="fw-bold action-btn"
                              :disabled="!getFile('other')"
                              primary
                              block
                              @click="sendDocument('other', 'front', getFile('other').file, ()=>{otherSent = true; otherSent2 = false})"
                            >
                              {{ $t('i18n_enviar') }}
                            </fb-fut-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <fut-modal
                class="text-center fut-color-dynamic"
                :open="modal.idFront"
                :title="$t('i18n_documento_de_identificacao')"
                @onClose="()=>{ modal.idFront = false; }"
              >
                <p class="fut-color-dynamic">
                  {{ $t('i18n_antes_de_enviar_o_seu_documento') }}
                </p>
                <img src="/frente.png" class="img-fluid" alt="">
              </fut-modal>
              <fut-modal
                class="text-center"
                :open="modal.idBack"
                :title="$t('i18n_documento_de_identificacao')"
                @onClose="()=>{ modal.idBack = false; }"
              >
                <p class="fut-color-dynamic">
                  {{ $t('i18n_antes_de_enviar_o_seu_documento') }}
                </p>
                <img src="/verso.png" class="img-fluid" alt="">
              </fut-modal>
              <fut-modal
                class="text-start"
                :open="modal.res"
                :title="$t('i18n_documento_de_identificacao_de_residencia')"
                @onClose="()=>{ modal.res = false; }"
              >
                <div class="article-container fut-color-dynamic">
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
                    <li>{{ $t('i18n_faturas_domesticas_recenter') }} ({{ $tc('i18n_emitidas_nos_ultimos_seis_meses', 2) }}) {{ $t('i18n_cuja_data_de_emissao_seja_visivel') }}</li>
                    <li>{{ $t('i18n_extrato_bancario') }} ({{ $tc('i18n_emitidas_nos_ultimos_seis_meses', 1) }})</li>
                    <li>{{ $t('i18n_autorizacao_de_residencia_valida') }}</li>
                    <li>{{ $t('i18n_certificado_de_resistencia_emitido') }}</li>
                  </ol>
                </div>
              </fut-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from 'vuex'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import FutSelect from '@/components/default/atoms/FutSelect.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'

// todo Add residence file
export default {
  name: 'FbDocuments',
  components: {
    FbFutButton,
    FutSelect,
    FutModal
  },
  props: {
    fill: {
      type: Boolean,
      default: false
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
      idFrontSent2: false,
      idBackSent2: false,
      idSelfieSent: false,
      idSelfieSent2: false,
      residenceSent2: false,
      otherSent2: false,
      documents: [],
      errors: null,
      modal: {
        idFront: false,
        idBack: false,
        res: false,
        other: false
      },
      fileOptions: [
        { label: 'Habilitação', value: 'license' },
        { label: 'Passaporte', value: 'passport' },
        { label: 'Identidade', value: 'id' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getLoading: 'upload-file/getLoading',
      getFiles: 'upload-file/getFiles'
    })
  },
  mounted () {
    this.fetchFiles()
  },
  methods: {
    ...mapActions({
      sendFile: 'upload-file/sendFile',
      fetchFiles: 'upload-file/fetchFiles'
    }),
    getFilesFiltered (desc, type) {
      if (!this.getFiles) {
        return
      }
      const files = this.getFiles.filter(el => el.desc === desc && el.type === type)
      return files[files.length - 1]
    },
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
        case 'license':
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
@import "@/assets/layout/breakpoints";

@media (max-width: 375px) {
  .accordion-body {
    padding: 1rem 4px;
  }
  tbody {
    tr {
      td {
        font-size: 14px;
      }
    }
  }
  .bet-status {
    span {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.profile-content {
  width: 100%;
  @include md {
    width: 80%;
  }
}
.header-profile {
  background-color: var(--fut-background);
}
.section-details {
  background-color: var(--fut-background-darker);
  @include md {
    background-color: var(--fut-background-lightest);
  }
  .section-details-header {
    color: white;
    background-color: var(--fut-background-lightest);
    @include md {
      border-bottom: 1px solid rgb(94, 91, 91);
      background-color: transparent;
    }
    .mobile-header {
      padding-left: 1%;
      border-left: 3px solid var(--fut-primary)
    }
  }
}
.label-control {
  color: white;
  font-size: 13px;
  width: 20%;
  @include md {
    width: auto;
  }
}
.input-control {
  background-color: transparent;
  border: none;
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
    &::placeholder {
      color: white;
      font-weight: bold;
      @include md {
        color: gray;
        font-weight: normal;
      }
    }
}
.contianer-md {
  margin: 0 20px;
  @include md {
    margin: 0 40px;
  }
}
.select-control {
  background-color: var(--fut-background);
  color: white;
  border: none;
  outline-color: var(--fut-primary);
  width: 100%;
}
.button-feature {
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
  border: none;
  border-radius: 5px;
}
.width-button {
  width: 100%;
  @include md {
    width: auto;
  }
}
.input-control-no-disabled {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--fut-background-lightest);
  @include md {
    width: 100%;
    background-color: var(--fut-background);
  }
    &::placeholder {
      color: white;
      font-weight: bold;
      @include md {
        color: gray;
        font-weight: normal;
      }
    }
}
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
  padding: 13px 20px;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 1px 3px rgb(0, 0, 0/25);
  border: 1px solid var(--fut-background-lighter);
  color: #FFF;
}
.action-btn {
  font-size: 16px;
  padding: 7px;
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
.btn-sent {
  background: #dfdfdf;
  margin-top: 10px;
}
</style>
