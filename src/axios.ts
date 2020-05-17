import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(defaults)
  const instace = Axios.prototype.request.bind(context)
  extend(instace, context)
  // 由于 ts 不能正确推断类型，所以自定义断言为指定类型
  return instace as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config!))
}

export default axios
