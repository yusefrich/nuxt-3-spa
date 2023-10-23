<template>
  <div>
    <img width="100%" height="294px" src="/Sg/Banner---convide-e-Ganhe.png" alt="">
    <div class="d-flex align-items-center mt-3 mb-5">
      <button class="btn-change w-100 me-1" :class="step === 1 ? 'is-active' : ''" @click="SwitchStep(1)">
        {{ $t('i18n_central_de_convites') }}
      </button>
      <button class="btn-change w-100 mx-1" :class="step === 2 ? 'is-active' : ''" @click="SwitchStep(2)">
        {{ $t('i18n_estatisticas_pessoais') }}
      </button>
      <button class="btn-change w-100 ms-1" :class="step === 3 ? 'is-active' : ''" @click="SwitchStep(3)">
        {{ $t('i18n_relatorios_de_ganhos') }}
      </button>
    </div>

    <div v-if="step === 1">
      <div class="d-md-flex d-grid">
        <div class="w-md-50 w-100">
          <div class="border-profile w-100 align-items-center d-flex p-2">
            <img width="57px" height="57px" class="profile-pic" src="/Sg/Profile-placeholder.png" alt="">
            <div class="ms-3">
              <h4 class="mb-0 fw-bold text-white">
                {{ $t('i18n_nome_do_usuario') }}
              </h4>
              <p class="mb-0 fw-bold text-muted">
                {{ $t('i18n_nivel_bronze') }}
              </p>
            </div>
          </div>
          <div class="d-flex align-items-center my-4">
            <img src="/Sg/Camada 2.png" alt="">
            <div class="w-100 container">
              <div class="d-flex align-items-center my-2 justify-content-between">
                <h4 class="mb-0 text-white fw-bold fs-18">
                  {{ $t('i18n_convidados_ativos') }}
                </h4>
                <span class="text-white fs-13 fw-bold">1/<span class="text-primary fs-13 fw-bold">10</span></span>
              </div>
              <div class="d-flex w-100 align-items-center">
                <div class="border-fil">
                  <div class="fil" />
                </div>
                <span class="text-white ms-1 fs-13">10%</span>
              </div>
            </div>
          </div>
          <div>
            <span class="fs-15 text-muted fw-bold">{{ $t('18n_link_do_convite') }}</span>
            <div class="d-flex align-items-center mt-1">
              <input class="input-content me-2 py-1 px-2" type="text" placeholder="https://betfiery.com?referralcode=6">
              <button class="btn-copy ms-2">
                <img src="/Sg/copy-svgrepo-com.png" alt="">
                <span>
                  {{ $t('i18n_copiar').toUpperCase() }}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="w-md-75 w-100 bg-white ms-md-3" />
      </div>
      <div class="d-flex align-items-center my-5">
        <div class="square-white-s me-3" />
        <div class="square-white-s mx-3" />
        <div class="square-white-s mx-3" />
        <div class="square-white-s ms-3" />
      </div>
      <div>
        <h4 class="mb-0 fs-20 text-center fw-bold text-muted">
          {{ $t('i18n_o_que_eu_ganho_convidando_meus') }}
        </h4>
      </div>
      <div id="MaisRecentes" class="carousel slide" data-bs-ride="carousel">
        <div class="d-flex my-5">
          <button class="bg-transparent border-0" type="button" data-bs-target="#MaisRecentes" data-bs-slide="prev">
            <img src="/Sg/Home/Prev.png" alt="">
          </button>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="d-flex">
                <div class="square-white-d me-3" />
                <div class="square-white-d mx-3" />
                <div class="square-white-d mx-3" />
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-flex">
                <div class="square-white-d me-3" />
                <div class="square-white-d mx-3" />
                <div class="square-white-d mx-3" />
              </div>
            </div>
          </div>
          <button class="bg-transparent border-0" type="button" data-bs-target="#MaisRecentes" data-bs-slide="next">
            <img src="/Sg/Home/Next.png" alt="">
          </button>
        </div>
      </div>
      <div>
        <h4 class="fw-bold text-center fs-20 text-muted">
          {{ $t('i18n_os_niveis_da') }} 7GAMES
        </h4>
      </div>
      <div id="MaisRecentes-d" class="carousel slide" data-bs-ride="carousel">
        <div class="d-flex my-5">
          <button class="bg-transparent border-0" type="button" data-bs-target="#MaisRecentes-d" data-bs-slide="prev">
            <img src="/Sg/Home/Prev.png" alt="">
          </button>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="d-flex">
                <div class="square-white-d me-3" />
                <div class="square-white-d mx-3" />
                <div class="square-white-d mx-3" />
              </div>
            </div>
            <div class="carousel-item">
              <div class="d-flex">
                <div class="square-white-d me-3" />
                <div class="square-white-d mx-3" />
                <div class="square-white-d mx-3" />
              </div>
            </div>
          </div>
          <button class="bg-transparent border-0" type="button" data-bs-target="#MaisRecentes-d" data-bs-slide="next">
            <img src="/Sg/Home/Next.png" alt="">
          </button>
        </div>
      </div>
    </div>

    <div v-if="step === 2">
      <h4 class="mb-0 fw-bold text-muted fs-20 text-center">
        {{ $t('i18n_convide_e_ganhe') }}
      </h4>
      <div class="square-white-s my-3" />
      <h4 class="mb-0 fw-bold text-muted fs-20 text-center">
        CASHBACK
      </h4>
      <div class="square-white-s my-3" />
      <h4 class="mb-0 fw-bold text-muted fs-20 text-center">
        {{ $t('i18n_ganhe_junto') }}
      </h4>
      <div class="square-white-s my-3" />
    </div>
    <div v-if="step === 3">
      <div class="d-flex align-items-center p-1 border-date">
        <img width="31px" height="31px" src="/Sg/calendar-svgrepo-com.png" alt="">
        <select>
          <option value="">
            10/09/2022 - 20/09/2022
          </option>
          <option value="">
            25/11/2022 - 28/11/2022
          </option>
          <option value="">
            12/12/2022 - 21/12/2022
          </option>
        </select>
      </div>
      <div class="border-darkest py-3 px-4 my-5">
        <div class="d-flex align-items-center">
          <img src="/Sg/coin-svgrepo-com.png" alt="">
          <span class="fw-bold text-white ms-2">{{ $t('i18n_extrato_de_bonificacoes') }}</span>
        </div>
        <div class="mt-3">
          <table class="w-100">
            <tr>
              <th>
                {{ $t('i18n_data_hora') }}
              </th>
              <th>
                {{ $t('i18n_usuario') }}
              </th>
              <th>
                {{ $t('i18n_tipo_de_bonus') }}
              </th>
              <th>
                {{ $t('i18n_valor') }} (R$)
              </th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1
    }
  },
  methods: {
    SwitchStep (number) {
      this.step = number
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

table {
  tr {
    background-color: var(--fut-background-darkest);

    th {
      text-align: center;
      border-left: 1px solid var(--fut-background-lightest);
      font-size: 13px;
      color: #fff;
    }
  }
}

select {
  background-color: transparent;
  border: none;
  color: #707070;
  outline: none;
  padding: 0 20px 0 0;
}

.border-date {
  border: 2px solid var(--fut-background-lightest);
  width: 255px;
  border-radius: 5px;
}

.square-white-s {
  background-color: #fff;
  width: 100%;
  height: 217px;
}

.border-darkest {
  border: 3px solid var(--fut-background-darkest);
  border-radius: 5px;
}

.square-white-d {
  background-color: #fff;
  width: 100%;
  height: 481px;
}

.border-fil {
  height: 11px;
  width: 100%;
  background-color: var(--fut-background-lightest);
  border-radius: 5px;

  .fil {
    width: 10%;
    height: 11px;
    background-color: var(--fut-primary);
    border-radius: 5px;
  }
}

.fs-20 {
  font-size: 20px;
}

.input-content {
  background-color: var(--fut-background-darkest);
  border-radius: 50px;
  border: 2px solid var(--fut-background-lightest);
  height: 40px;
  width: 60%;
}

.btn-copy {
  border-radius: 5px;
  height: 40px;
  background: transparent;
  border: 3px solid var(--fut-primary);
  color: var(--fut-primary);
  width: 40%;
}

.fs-13 {
  font-size: 13px;
}

.fs-18 {
  font-size: 18px;
}

.border-profile {
  border-radius: 50px;
  background-color: var(--fut-background-darkest);
}

.profile-pic {
  border-radius: 100%;
  border: 2px solid var(--fut-primary);
}

.btn-change {
  background-color: var(--fut-background-lighter);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 15px;
  height: 54px;
  font-weight: bold;
  color: #707070;
  font-size: 13px;
  @include md {
    font-size: 18px;
  }

  &.is-active {
    background: linear-gradient(var(--fut-primary), var(--fut-secondary));
    border: none;
    color: var(--fut-background-darkest);
  }
}
</style>
