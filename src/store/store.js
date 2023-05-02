import { createStore } from 'vuex'
import modules from './modules'

const store = createStore({
    modules
})

for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store
