import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Subscriber from '~/utils/sucscriber'

@Module({ name: 'batch', stateFactory: true, namespaced: true })
export default class Batch extends VuexModule {
  currentTask: string = ''
  progress: number = null
  processing: boolean = false

  @Mutation
  setStat({ task, progress, processing }) {
    this.currentTask = task
    this.progress = progress
    this.processing = processing || false
  }

  @Action
  startSubscribe() {
    Subscriber.subscribe('batch-stat', (data) => {
      const processing = data.progress != null && Number(data.progress) !== 100
      this.setStat({
        task: data.taskName,
        progress: data.progress.toFixed(1),
        processing,
      })
      if (!processing) {
        setTimeout(() => {
          this.setStat({ task: '', progress: null, processing })
        }, 2600)
      }
    })
  }
}
