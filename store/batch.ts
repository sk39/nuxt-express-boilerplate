import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Subscriber from '~/utils/sucscriber'

@Module({ name: 'batch', stateFactory: true, namespaced: true })
export default class Batch extends VuexModule {
  currentTask: string = ''
  progress: number = null
  processing: boolean = false

  @Mutation
  setStat({ task, progress }) {
    this.currentTask = task
    this.progress = progress
    this.processing = progress != null && Number(progress) !== 100
  }

  @Action
  prepare() {
    Subscriber.subscribe('batch-stat', (data) => {
      this.setStat({ task: data.taskName, progress: data.progress.toFixed(1) })
      if (String(data.progress) === '100') {
        setTimeout(() => {
          this.setStat({ task: '', progress: null })
        }, 2000)
      }
    })
  }
}
