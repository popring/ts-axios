import { AxiosInstance } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helpers/util";

function axiosInstance(): AxiosInstance {
  const context = new Axios()
  const instace = Axios.prototype.request.bind(context)
  extend(instace, context)
  // 由于 ts 不能正确推断类型，所以自定义断言为指定类型
  return instace as AxiosInstance
}

const axios = axiosInstance()

export default axios
