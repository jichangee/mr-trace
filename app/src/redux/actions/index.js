import { LOADING, SETEMAIL } from '../constant'

export const setLoading = data => ({ type: LOADING, data })
export const setEmail = data => ({ type: SETEMAIL, data })