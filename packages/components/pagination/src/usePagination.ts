import { inject } from 'vue'
import { hcPaginationKey } from './constants'

export const usePagination = () => inject(hcPaginationKey, {})
