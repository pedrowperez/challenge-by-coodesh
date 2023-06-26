import Antd from 'ant-design-vue'
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, app }) => {
  if (isClient)
    app.use(Antd)
}
