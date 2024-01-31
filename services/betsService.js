let cancelToken

const betsService = {
  async userBets (filters) {
    const config = useRuntimeConfig()
    // search filter string concatenation
    let filtersString = ''
    let counter = 0
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      const data = await $fetch(config.public.BASE_URL + `/bets${filtersString}`)

      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  /**
   * @param {*} type
   * @param {string} date
   * @param {string} hour
   * @param {string} team
   * @param {string} page
   * @param {string} paginate // * can only be all, if it has all the request will overwrite pagination with page variable
   * @return {Array}
   */
  async events (filters) {
    const config = useRuntimeConfig()
    // Check if there are any previous pending requests
    // if (typeof cancelToken !== typeof undefined) {
    //   cancelToken.cancel('Operation canceled due to new request.')
    // }
    // Save the cancel token for the current request
    // cancelToken = this$.apiCancelToken.source()

    // search filter string concatenation
    let filtersString = ''
    let counter = 0

    for (const [key, value] of Object.entries(filters)) {
      if (value && counter === 0) {
        filtersString = filtersString + '?' + key + '=' + value
        counter++
      } else if (value) {
        filtersString = filtersString + '&' + key + '=' + value
      }
    }
    
    try {
      // const data = await $fetch(config.public.BASE_URL + `/events${filtersString}`, { cancelToken: cancelToken.token })
      const data = await $fetch(`${config.public.BASE_URL}/events${filtersString}`)

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async eventsSearch (team) {
    const config = useRuntimeConfig()
    // Check if there are any previous pending requests
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.')
    }
    // Save the cancel token for the current request
    // cancelToken = this$.apiCancelToken.source()
    try {
      // const data = await $fetch(config.public.BASE_URL + `/filter/event?team=${team}`, { cancelToken: cancelToken.token })
      const data = await $fetch(config.public.BASE_URL + `/filter/event?team=${team}`)

      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async eventsSearchUnprotected (team) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/filter/event?team=${team}`)

      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async brasilEvents () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + '/events/country/br')

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async blackList () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `${process.env.BASE_URL_DEV}/inplay/blacklist`, {
        headers: {
          'x-api-key': '5efa1168b7e6cfdf75e6874b8cc3aa33',
          'x-api-host': 'https://dev.fdsbet.com'
        }
      })

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async betsByDay (date) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/events?date=${date}`)/* ${url}/events ?date=2021-07-06 */

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async betsByTime (hour) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/events?hour=${hour}`)/* ${url}/events ?hour=3 */

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async event (slug) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(`${config.public.BASE_URL}/event/${slug}`)/* ${url}/events ?date=2021-07-06 */

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async mainEvents (sport) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(`${config.public.BASE_URL}/leagues/main${sport ? '?sport=' + sport : ''}`)
    
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async allMainLeagues () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + '/leagues/main?sport=all')

      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async allLeagues () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + '/leagues?sport=all')
      
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async leagues (sport) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/leagues${sport ? '?sport=' + sport : ''}`)

      // console.log('this is the return of leagues service', data.data.data)
      return [data.data.data, null]
    } catch (error) {
      /* console.error(error) */
      return [null, error]
    }
  },
  async league (id) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/leagues/${id}`)/* ${url}/events ?date=2021-07-06 */

      return [[data.data.data], null]
    } catch (error) {
      /* console.error(error) */
      return [null, error]
    }
  },
  async cashout (id) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(
        config.public.BASE_URL + `/bets/${id}/cashout`,
        { methods: 'PUT' }
      )

      return [data.data, null]
    } catch (error) {
      /* console.error(error) */
      return [null, error]
    }
  },
  async postBet (payload) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(
        `${config.public.BASE_URL}/bets`,
        { method: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      /* console.error(error) */
      return [null, error]
    }
  },
  async featuredBets (sportId) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `/events/main${sportId ? '?sport=' + sportId : ''}`)
      
      return [data.data, null]
    } catch (error) {
      /* console.error(error) */
      return [null, error]
    }
  }
}

export default betsService
