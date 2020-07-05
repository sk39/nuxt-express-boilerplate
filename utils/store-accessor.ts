import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Batch from '~/store/batch'
import Subscriber from '~/utils/sucscriber'

let batchStore: Batch

function initialiseStores(store: Store<any>): void {
  Subscriber.connect()
  batchStore = getModule(Batch, store)
  batchStore.startSubscribe()
}

export { initialiseStores, batchStore }
