<template>
  <div class="mx-1 mt-5">
    <div class="last-minutes-content py-2">
      <div class="container-fluid text-white">
        <font-awesome-icon :icon="['fas', 'clock']" />
        <span class="title-head">{{ $t('i18n_proximos') }}</span>
      </div>
    </div>
    <fb-tabs class="mt-1">
      <fb-wrapper name="Futebol" selected="true">
        <table class="odds-table">
          <tbody>
            <tr class="tr-set text-white">
              <td class="set-holder" />
              <td class="set-sel">
                <span>1</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>x</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>2</span>
              </td>
              <td class="set-sel" />
            </tr>
          </tbody>
        </table>
        <table class="odds-table">
          <tbody>
            <fb-bets
              team-name-first="PAOK Thessaloni"
              team-name-secound="Olympiacos Piraeus"
              percentage-odds="923"
              odds-number-one="1.3"
              odds-number-two="4.3"
              odds-number-three="6.3"
              date="23/04"
              time="10:30"
            />
            <fb-bets
              team-name-first="Flamengo"
              team-name-secound="Atlético-Go"
              percentage-odds="733"
              odds-number-one="1.3"
              odds-number-two="6.3"
              odds-number-three="2.3"
              date="22/04"
              time="17:00"
            />
            <fb-bets
              team-name-first="Fluminense"
              team-name-secound="Bahia"
              percentage-odds="123"
              odds-number-one="5.3"
              odds-number-two="2.3"
              odds-number-three="1.3"
              date="23/04"
              time="10:42"
            />
            <fb-bets
              team-name-first="Vasco"
              team-name-secound="Santos"
              percentage-odds="33"
              odds-number-one="2.3"
              odds-number-two="4.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
          </tbody>
        </table>
      </fb-wrapper>
      <fb-wrapper name="Desafio 1 Pra 1">
        <table class="odds-table">
          <tbody>
            <tr class="tr-set text-white">
              <td class="set-holder" />
              <td class="set-sel">
                <span>1</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>2</span>
              </td>
              <td class="set-sel" />
            </tr>
          </tbody>
        </table>
        <table class="odds-table">
          <tbody>
            <fb-bets
              team-name-first="Cremosinho"
              team-name-secound="Ney Silva"
              percentage-odds="2"
              odds-number-two="4.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
          </tbody>
        </table>
      </fb-wrapper>
      <fb-wrapper :name="$t('i18n_tenis')">
        <table class="odds-table">
          <tbody>
            <tr class="tr-set text-white">
              <td class="set-holder" />
              <td class="set-sel">
                <span>1</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>2</span>
              </td>
              <td class="set-sel" />
            </tr>
          </tbody>
        </table>
        <table class="odds-table">
          <tbody>
            <fb-bets
              team-name-first="Wolf, Jeffy"
              team-name-secound="Zhang, Zhinzhen"
              percentage-odds="2"
              odds-number-two="4.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
          </tbody>
        </table>
      </fb-wrapper>
      <fb-wrapper name="Basquete">
        <table class="odds-table">
          <tbody>
            <tr class="tr-set text-white">
              <td class="set-holder" />
              <td class="set-sel">
                <span>1</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>2</span>
              </td>
              <td class="set-sel" />
            </tr>
          </tbody>
        </table>
        <table class="odds-table">
          <tbody>
            <fb-bets
              team-name-first="Norrkoping Dolphins"
              team-name-secound="Lulea BBK"
              percentage-odds="124"
              odds-number-two="1.3"
              odds-number-three="5.3"
              date="23/04"
              time="10:42"
            />
            <fb-bets
              team-name-first="KK Cibona Zagreb"
              team-name-secound="KK Zadar"
              percentage-odds="22"
              odds-number-two="4.3"
              odds-number-three="1.3"
              date="23/04"
              time="10:42"
            />
            <fb-bets
              team-name-first="Vaerlose Bkk"
              team-name-secound="Stevnsgade Supermen"
              percentage-odds="24"
              odds-number-two="1.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
          </tbody>
        </table>
      </fb-wrapper>
      <fb-wrapper name="Voleibol">
        <table class="odds-table">
          <tbody>
            <tr class="tr-set text-white">
              <td class="set-holder" />
              <td class="set-sel">
                <span>1</span>
              </td>
              <td class="set-holder-w1" />
              <td class="set-sel">
                <span>2</span>
              </td>
              <td class="set-sel" />
            </tr>
          </tbody>
        </table>
        <table class="odds-table">
          <tbody>
            <fb-bets
              team-name-first="Eczacibasi Vitra Istanbul"
              team-name-secound="Fenerbahce Grundig"
              percentage-odds="2"
              odds-number-two="4.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
            <fb-bets
              team-name-first="AZS Potechnika Warszawska"
              team-name-secound="MKS Cuprum Mundo Lubin"
              percentage-odds="2"
              odds-number-two="4.3"
              odds-number-three="3.3"
              date="23/04"
              time="10:42"
            />
          </tbody>
        </table>
      </fb-wrapper>
    </fb-tabs>
  </div>
</template>
<script>
import FbWrapper from '@/components/fb/atoms/FbWrapper'
import FbTabs from '@/components/fb/molecules/FbTabs'
import FbBets from '@/components/fb/molecules/FbBets'
export default {
  components: { FbWrapper, FbTabs, FbBets }
}
</script>
<style lang="scss" scoped>
.last-minutes-content {
  background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary) );
  width: 100%;
}
.title-head {
  font-size: 12px;
  text-transform: uppercase;
}
.header-bets {
  background-color: #31343B;
  border-bottom: 1px solid rgb(68, 69, 73);
}
.odds-table {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  border-spacing: 0;
}
.tr-set {
  background-color: #31343B;
  border-spacing: 2px;
}
.set-sel {
  text-transform: uppercase;
  text-align: center;
  font-size: 11px;
  border-spacing: 2px;
  padding: 2px 3px;
  width: 45px;
}
.set-holder-w1 {
  width: 1px;
}
</style>
