<template>
    <div v-if="!getCurrentSportsProvider || (getCurrentSportsProvider && getCurrentSportsProvider !== 'upgaming')">
        <!-- <home-nsx
        v-if="getCurrentLayoutStyle === 'oldBet365'"
        />
        <sg-home
        v-else-if="getCurrentLayoutStyle === 'SG'"
        />
        <fb-home
        v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'"
        />
        <md-home
        v-else-if="getCurrentLayoutStyle === 'MD'"
        />
        <sk-home
        v-else-if="getCurrentLayoutStyle === 'SK'"
        /> -->
        <home
        />
    </div>
    <third-party-provider v-else :layout="getCurrentLayoutStyle" />
</template>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import Home from '@/components/default/templates/Home'
// import HomeNsx from '@/components/nsx/templates/HomeNsx'
// import SgHome from '@/components/sg/templates/SgHome'
// import FbHome from '@/components/fb/templates/FbHome'
// import MdHome from '@/components/md/templates/MdHome'
import ThirdPartyProvider from '@/components/default/templates/ThirdPartyProvider'

export default {
    components: {
        Home,
        // HomeNsx,
        // FbHome,
        // SgHome,
        // MdHome
        ThirdPartyProvider
    },
    layout (context) {
        return context.store.getters['layout/getCurrentLayoutComponent']
    },
    middleware ({ store, redirect }) {
        const config = store.getters['layout/getCurrentApplicationType']
        const layout = store.getters['layout/getCurrentLayoutStyle']
        if (config === 'all') {
            return
        }
        if (layout !== 'SG' && config && config.includes('casino') && !config.includes('sports')) {
            return redirect('/casino')
        }
        if (layout === 'SG' && config && !config.includes('casino') && config.includes('sports')) {
            return redirect('/sports')
        }
    },
    asyncData ({ redirect, query }) {
        if (process.client) {
            const width = window.innerWidth

            if (query && JSON.stringify(query) !== JSON.stringify({})) {
                return
            }
            if (process.env.LANDING_PAGE === 'all') {
                redirect('/landing/')
            } else if (process.env.LANDING_PAGE === 'mobile' && width <= 821) {
                redirect('/landing/')
            } else if (process.env.LANDING_PAGE === 'desktop' && width > 821) {
                redirect('/landing/')
            }
        }
    },
    computed: {
        ...mapState(useLayoutStore, {
            getCurrentSportsProvider: 'getCurrentSportsProvider',
            getCurrentLayoutStyle: 'getCurrentLayoutStyle'
        }),
    },
    mounted () {
            this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 500)
            })
        }
    }
</script>
