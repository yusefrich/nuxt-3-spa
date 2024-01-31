import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchStore = defineStore('preMatch', {
	state: () => ({
		events: null,
		loading: false,
		errors: null,
		filters: {
			date: null,
			hour: null,
			team: null,
			page: null,
			country: null,
			paginate: null,
			sport: 6046
		}
	}),
	actions: {
		changeFilter (payload) {
			Object.entries(payload).forEach((item) => {
				const [key, value] = item

				this.filters[key] = value
			})
		},
		fetchPreMatchEvents () {
			this.loading = true
	
			return new Promise(async (resolve, reject) => {
				this.events = []
	
				const [data, err] = await betsService.events(this.filters)
	
				if (err) {
					this.errors = err.errors
					this.loading = false

					reject(err)
				}
	
				this.errors = null
				this.loading = false
				this.events = data

				resolve(data)
			})
		},
		concatPreMatchEvents () {
			if (this.filters.page && this.filters.page > 1) {
				this.changeFilter({ page: this.filters.page + 1 })
			} else {
				this.changeFilter({ page: 2 })
			}
	
			this.loading = true
	
			return new Promise(async (resolve, reject) => {
				const [data, err] = await betsService.events(this.filters)
	
				if (err) {
					this.errors = err.errors
					this.loading = false

					reject(err)
				}
	
				const currentEvents = this.events.concat(data)
	
				this.errors = null
				this.loading = false
				this.events = currentEvents

				resolve(currentEvents)
			})
		}
	},
	getters: {
		getPreMatchEvents: state => state.events,
		getPreMatchLoading: state => state.loading,
		getFilters: state => state.filters,
		getErrors: state => state.errors
	}
})