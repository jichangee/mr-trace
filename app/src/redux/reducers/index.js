import { LOADING, SETEMAIL } from '../constant'

const initState = { loading: false, email: window.localStorage.getItem(SETEMAIL) }
export default function (preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case LOADING:
      return { ...preState, loading: data }
    case SETEMAIL:
      window.localStorage.setItem(SETEMAIL, data)
      return { ...preState, email: data }
    default:
      return preState
  }
}
