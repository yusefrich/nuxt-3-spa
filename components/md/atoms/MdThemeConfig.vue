<template>
  <div>
    <component :is="'style'">
      :root {
      --md-light-color: {{ getHsl(config?config.color_background:'')['h'] }}, {{ getHsl(config?config.color_background:'')['s'] }}%;
      --md-light-l: {{ getHsl(config?config.color_background:'')['l'] }}%;

      --md-light: hsl(var(--md-light-color), var(--md-light-l));

      --md-light-1: hsl(var(--md-light-color), 95%);
      --md-light-1-transparent: hsla(var(--md-light-color), 95%, .65);
      --md-light-2: hsl(var(--md-light-color), 92%);
      --md-light-3: hsl(var(--md-light-color), 88%);
      --md-light-4: hsl(var(--md-light-color), 80%);
      --md-light-5: hsl(var(--md-light-color), 70%);
      --md-light-5-transparent: hsla(var(--md-light-color), 70%, .2);
      --md-light-6: hsl(var(--md-light-color), 17%);
      --md-light-6-transparent: hsl(var(--md-light-color), 10%, .5);

      --md-dark-color: {{ getHsl(config?config.color_background_sec:'')['h'] }}, {{ getHsl(config?config.color_background_sec:'')['s'] }}%;
      --md-dark-l: {{ getHsl(config?config.color_background_sec:'')['l'] }}%;

      --md-dark: hsl(var(--md-dark-color), var(--md-dark-l));

      --md-dark-1: hsl(var(--md-dark-color), 11%);
      --md-dark-1-transparent: hsla(var(--md-dark-color), 11%, .65);
      --md-dark-2: hsl(var(--md-dark-color), 8%);
      --md-dark-2-transparent: hsla(var(--md-dark-color), 8%, .2);
      --md-dark-3: hsl(var(--md-dark-color), 14%);
      --md-dark-4: hsl(var(--md-dark-color), 20%);
      --md-dark-5: hsl(var(--md-dark-color), 29%);
      --md-dark-6: hsl(var(--md-dark-color), 90%);
      --md-dark-6-transparent: hsl(var(--md-dark-color), 90%, .5);

      --md-bg-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-2)' : '#f9fafb'
          : config && config.color_background_sec ? 'var(--md-dark-2)' : '#070d19'
      }};
      --md-comp-bg-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-1)' : '#fff'
          : config && config.color_background_sec ? 'var(--md-dark-1)' : '#0c1427'
      }};
      --md-comp-bg-color-transparent: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-1-transparent)' : '#fff'
          : config && config.color_background_sec ? 'var(--md-dark-1-transparent)' : '#0c1427'
      }};
      --md-inverse-comp-bg-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-dark-1)' : '#0c1427'
          : config && config.color_background_sec ? 'var(--md-light-1)' : '#fff'
      }};
      --md-comp-border-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-3)' : '#e9ecef'
          : config && config.color_background_sec ? 'var(--md-dark-3)' : '#172340'
      }};
      --md-input-disabled-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-5)' : '#aaa'
          : config && config.color_background_sec ? 'var(--md-dark-5)' : '#2a3c66'
      }};
      --md-shadow-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-5-transparent)' : 'rgba(183,192,206,.2)'
          : config && config.color_background_sec ? 'var(--md-dark-2-transparent)' : '#070d19'
      }};
      --md-ticket-shadow-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-5)' : '#a0a0a0'
          : config && config.color_background_sec ? 'var(--md-dark-2)' : '#030303'
      }};
      --md-strong-shadow-color: {{
        theme == 'light'
          ? config && config.color_background ? '#00000050' : '#00000050'
          : config && config.color_background_sec ? '#ffffff30' : '#ffffff30'
      }};
      --md-font-color: {{
        theme == 'light'
          ? config && config.color_background ? '#000' : '#000'
          : config && config.color_background_sec ? '#fff' : '#fff'
      }};
      --md-inverse-font-color: {{
        theme == 'light'
          ? config && config.color_background ? '#fff' : '#fff'
          : config && config.color_background_sec ? '#000' : '#000'
      }};
      --md-menu-idx-font-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-6-transparent)' : '#7987a1'
          : config && config.color_background_sec ? 'var(--md-dark-6)' : '#d0d6e1'
      }};
      --md-menu-items-font-color: {{
        theme == 'light'
          ? config && config.color_background ? '#000' : '#000'
          : config && config.color_background_sec ? 'var(--md-dark-6-transparent)' : '#7987a1'
      }};
      --md-switcher-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--fut-primary)' : 'var(--fut-primary)'
          : config && config.color_background_sec ? 'var(--md-dark-1)' : '#0c1427'
      }};
      --md-payment-bg-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-2)' : '#fbfbfb'
          : config && config.color_background_sec ? 'var(--md-dark-2)' : '#070d19'
      }};
      --md-filter-bg-color: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-4)' : '#E1E8F6'
          : config && config.color_background_sec ? 'var(--md-dark-4)' : '#242f46'
      }};
      --md-event-hover: {{
        theme == 'light'
          ? config && config.color_background ? 'var(--md-light-2)' : '#F3FaFF'
          : config && config.color_background_sec ? 'var(--md-dark-2)' : '#061332'
      }};

      --md-highlight-color: {{ getHsl(config?config.color_highlight:'')['h'] }}, {{ getHsl(config?config.color_highlight:'')['s'] }}%;
      --md-highlight-l: {{ getHsl(config?config.color_highlight:'')['l'] }}%;

      /* --md-highlight: {{ config && config.color_highlight ? config.color_highlight : '#0A74EF' }}; */
      --md-highlight: {{
        theme == 'dark'
          ? config && config.color_highlight ? 'hsl(var(--md-highlight-color), 74%)' : '#318CF4'
          : config && config.color_highlight ? 'hsl(var(--md-highlight-color), 14%)' : '#1267C2'
      }};

      --md-highlight-lighter: {{ config && config.color_highlight ? 'hsl(var(--md-highlight-color), 34%)' : '#318CF4' }};
      --md-highlight-lightest: {{ config && config.color_highlight ? 'hsl(var(--md-highlight-color), 74%)' : '#318CF4' }};
      --md-highlight-darker: {{ config && config.color_highlight ? 'hsl(var(--md-highlight-color), 14%)' : '#1267C2' }};

      --md-bg-third-color: {{ getHsl(config?config.color_background_third:'')['h'] }}, {{ getHsl(config?config.color_background_third:'')['s'] }}%;
      --md-bg-third-lighter: {{ config && config.color_background_third ? 'hsla(var(--md-bg-third-color), 35%, .4)' : '#318CF4' }};
      --md-bg-third: {{ config && config.color_background_third ? config.color_background_third : '#072443' }};
      }
    </component>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'

export default {
  name: 'MdThemeConfig',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  methods: {
    getHsl (hex) {
      return utils.getHsl(hex)
    }
  }
}
</script>
