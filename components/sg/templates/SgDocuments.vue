<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="profile-border d-flex align-items-center w-100 p-2">
        <img
          class="mb-0 profile-content"
          :src="`https://ui-avatars.com/api/?background=eeeeee&name=${loggedInUser.username}&color=333333`"
          alt=""
        >
        <div class="ms-2">
          <h4 class="text-white mb-0 fw-bold">
            {{ loggedInUser.username }}
          </h4>
          <!-- <p class="text-muted mb-0">
            Nivel Bronze
          </p> -->
        </div>
      </div>
      <img class="ms-3" src="/Sg/Bronze.png" alt="">
    </div>
    <div class="documents-content py-3 my-3 container">
      <div class="d-flex alig-items-center">
        <img width="55px" height="37px" src="/Sg/card-checklist-svgrepo-com.png" alt="">
        <div>
          <h4 class="mb-0 ms-2 text-white fw-bold">
            {{ $t('i18n_processo_de_verificacao') }}
          </h4>
          <p class="mb-0 ms-3 text-white">
            {{ $t('i18n_para_completar_o_processo_de_verificacao') }}
          </p>
        </div>
      </div>
      <div class="mt-3 w-100">
        <fb-documents :fill="true" />
      </div>
      <!-- <div class="border-green d-flex align-items-center justify-content-between py-1 px-2 mt-4">
        <div class="d-flex align-items-center">
          <img class="me-3" src="/Sg/SquareProfile.png" alt="">
          <span class="text-primary fw-bold">Documentos Enviados</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="bg-green text-center">
            <span class="fw-bold text-white">0</span>
          </div>
          <font-awesome-icon class="ms-2 text-muted" :icon="['fas', 'caret-down']" />
        </div>
      </div> -->
      <!-- <div class="border-green d-flex align-items-center justify-content-between py-1 px-2 mt-3">
        <div class="d-flex align-items-center">
          <img class="me-3" src="/Sg/Profile-2.png" alt="">
          <span class="text-primary fw-bold">Documentos de Identificação</span>
        </div>
        <font-awesome-icon class="ms-2 text-primary" :icon="['fas', 'caret-up']" />
      </div> -->
      <!-- <div class="container documents-controler my-3">
        <select class="w-100 my-2 p-1 select-control">
          <option value="">
            Selecionar o tipo de Documento
          </option>
        </select>
        <h4 class="fw-bold text-white mb-0 my-1 ms-2">
          Frente do Documento
        </h4>
        <button class="w-100 dashed-border py-4 mt-2">
          <img src="/Sg/Grupo 141.png" alt="">
          <span class="text-white">Escolha os documentos e clique em enviar para completar o passo. Os formatos de arquivos aceitos são:</span>
          <span class="text-white fw-bold">.jpg, .jpeg, .gif, .png, .tiff, .tif, .pdf</span>
          <span class="text-white">O tamanho dos arquivos não deve exceder os 8mb</span>
        </button>
        <div class="my-3">
          <button class="btn-border my-md-0 my-2">
            EXEMPLO
          </button>
          <button class="btn-green">
            ENVIAR
          </button>
        </div>
        <h4 class="fw-bold text-white mb-0 my-1 ms-2">
          Verso do Documento
        </h4>
        <button class="w-100 dashed-border py-4 mt-2">
          <img src="/Sg/Grupo 141.png" alt="">
          <span class="text-white">Escolha os documentos e clique em enviar para completar o passo. Os formatos de arquivos aceitos são:</span>
          <span class="text-white fw-bold">.jpg, .jpeg, .gif, .png, .tiff, .tif, .pdf</span>
          <span class="text-white">O tamanho dos arquivos não deve exceder os 8mb</span>
        </button>
        <div class="my-3">
          <button class="btn-border my-md-0 my-2">
            EXEMPLO
          </button>
          <button class="btn-green">
            ENVIAR
          </button>
        </div>
      </div> -->
      <!-- <div class="border-green d-flex align-items-center justify-content-between py-1 px-2 mt-3">
        <div class="d-flex align-items-center">
          <img class="me-3" src="/Sg/House game-w.png" alt="">
          <span class="text-primary fw-bold">Comprovante de Residência</span>
        </div>
        <font-awesome-icon class="ms-2 text-muted" :icon="['fas', 'caret-down']" />
      </div> -->
      <!-- <div class="d-flex my-2 alig-items-center">
        <img width="55px" height="37px" src="/Sg/card-checklist-svgrepo-com.png" alt="">
        <div>
          <h4 class="mb-0 ms-2 text-white fw-bold">
            Processo de Verificação
          </h4>
          <p class="mb-0 ms-3 text-white">
            Para completar o Processo de Verificação siga os passos abaixo e envie os documentos necessários.
          </p>
        </div>
      </div> -->
      <!-- <div class="border-green d-flex align-items-center justify-content-between py-1 px-2 mb-3 mt-3">
        <div class="d-flex align-items-center">
          <img class="me-3" src="/Sg/profileSquare.png" alt="">
          <span class="text-primary fw-bold">Outro Documento</span>
        </div>
        <font-awesome-icon class="ms-2 text-muted" :icon="['fas', 'caret-down']" />
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FbDocuments from '@/components/fb/templates/FbDocuments'

export default {
  components: {
    FbDocuments
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.profile-border {
  border-radius: 50px;
  background-color: var(--fut-background-darkest);
}

.profile-content {
  width: 66px;
  height: 66px;
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}

.documents-content {
  border-radius: 10px;
  border: 3px solid var(--fut-background-darkest);

  h4 {
    font-size: 16px;
  }

  p {
    font-size: 13px;
  }
}

.border-green {
  border: 2px solid var(--fut-primary);
  border-radius: 5px;

  .bg-green {
    width: 25px;
    font-size: 18px;
    background-color: var(--fut-primary);
    border-radius: 5px;
  }
}

.documents-controler {
  background-color: var(--fut-background-darkest);
  border-radius: 5px;
}

.select-control {
  background-color: var(--fut-primary);
  border: none;
  border-radius: 5px;
  outline: none;
}

.dashed-border {
  border: 3px dashed var(--fut-primary);
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.btn-border {
  width: 100%;
  height: 45px;
  font-weight: bold;
  border: 2px solid var(--fut-primary);
  background: transparent;
  border-radius: 5px;
  color: var(--fut-primary);
  font-size: 14px;
  @include md {
    width: 210px;
  }
}

.btn-green {
  width: 100%;
  height: 45px;
  font-weight: bold;
  border: none;
  background: linear-gradient(var(--fut-primary), var(--fut-secondary));
  border-radius: 5px;
  font-size: 14px;
  @include md {
    width: 151px;
  }
}
</style>
