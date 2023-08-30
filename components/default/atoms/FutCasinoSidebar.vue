<template>
  <div class="sticky-sidebar">
    <ul class="list-unstyled ps-0 sidebar-content fut-scrollbar">
      <li class="mb-1 section-container">
        <fut-button
          class="btn section-title btn-dark align-items-start text-start collapsed fw-bold"
          data-bs-toggle="collapse"
          data-bs-target="#sport-0-collapse"
          aria-expanded="true"
        >
          <span class="ms-3 ps-1">
            {{ $t('i18n_categorias') }}
          </span>
          <font-awesome-icon class="text-primary float-end mt-1 me-2" :icon="['fas', 'chevron-up']" />
        </fut-button>
        <div id="sport-0-collapse" class="collapse show m-0">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <spinner v-if="loading" />
            <li class="section-link transition">
              <fut-button to="/casino/new" class="a link-light btn btn-block text-start rounded text-decoration-none category-link transition">
                <span class="category-name transition"><font-awesome-icon class="transition text-gold" :icon="['fas', 'star']" /> {{ $t('i18n_novos') }}</span>
              </fut-button>
            </li>
            <li class="section-link transition">
              <fut-button to="/casino/most_played" class="a link-light btn btn-block text-start rounded text-decoration-none category-link transition">
                <span class="category-name transition"><font-awesome-icon class="transition text-gold" :icon="['fas', 'star']" /> {{ $t('i18n_mais_jogados') }}</span>
              </fut-button>
            </li>
            <li v-for="(item, index) in categories" :key="`count_categories_casino_${index}`" class="section-link transition">
              <fut-button :to="'/casino/category/' + item.slug" class="a link-light btn btn-block text-start rounded text-decoration-none category-link transition">
                <span class="category-name transition"><span class="casino-category-icon transition text-gold"><font-awesome-icon class="transition" :icon="['fas', 'coins']" /></span> {{ item.category }}</span>
                <span class="leagues-total text-secondary-light transition">{{ item.games_count }}</span>
              </fut-button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Spinner from '@/components/default/atoms/Spinner'
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: { Spinner, FutButton },
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.pointer{
  cursor: pointer;
}
.text-gold{
  color: #eeba33;
}
.category-link{
  display: flex;
  .casino-category-icon{
    left: -16px;
    position: relative;
  }
  &:hover{
    .casino-category-icon{
      left: 0px;
    }
  }
}
.category-name{
  white-space: nowrap;
  width: 100%;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: lowercase;
  display:inline-block;
  &:first-letter {
    text-transform: uppercase;
  }
}
.leagues-total{
  float: right;
  background: var(--fut-background);
  border-radius: 5px;
  padding: 0px 5px;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
.form-range{
  width: 89% !important;
  margin-left: 7%;
}
.form-range::-webkit-slider-thumb {
  background: var(--white);
  border: 6px solid var(--fut-primary);
  border-radius: 10px 10px 10px 0;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.sticky-sidebar{
  position: sticky;
  top: 95px;
}

.slider-holder{
    background: var(--fut-background-lightest);

}
.section-container{
  margin-top: 3px;
  margin-bottom: 3px;

  .section-title{
    border-radius: 0px !important;
    background: var(--fut-secondary-darkest);
    width: 100%;
    color: $white;
    padding: 5px 7px;
    border: none;
    border-left: 3px solid #eeba33;
  }
  .section-link{
    margin-top: 5px;
    margin-bottom: 5px;
    background: var(--fut-background-lightest);
    .a{
      width: 100%;
    }
  }
}
.img-bg-inside{
  background: linear-gradient(
    0deg,
    var(--fut-primary-darkest) 0%,
    var(--fut-primary) 100%
  );
}
.img-container {
  img{
    object-fit: contain;
  }
  height: 112px !important;

  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-content{
  height: calc(100vh - 71px);
  overflow: auto;
  margin-top: 71px;
  @include md {
    margin-top: 0px;
    height: calc(100vh - 95px);
  }
}
.leagues{
  padding-bottom: 10px;
}
.league-link{
  background: var(--fut-secondary-darker);
  margin-top: 4px;
}
</style>
