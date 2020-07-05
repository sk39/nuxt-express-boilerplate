import axios from 'axios'

export enum ProcessState {
  NONE = 'NONE',
  CONFIRM = 'CONFIRM',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ProcessArg {
  title?: string
  message?: string
}

export default class ProcessModel {
  state: ProcessState = ProcessState.NONE
  task: string
  title: string = ''
  message: string = ''
  confirmDone: () => Promise<any>

  setTask(task: string) {
    this.task = task
    return this
  }

  setArg(arg: ProcessArg) {
    if (arg.title) this.title = arg.title
    if (arg.message) this.message = arg.message
    return this
  }

  confirm(arg: ProcessArg): { done: (callback) => void } {
    this.state = ProcessState.CONFIRM
    this.setArg(arg)
    return {
      done: (callback) => {
        this.confirmDone = callback
      },
    }
  }

  async clickDone() {
    if (this.confirmDone) this.confirmDone().then()
  }

  processing(arg?: ProcessArg) {
    this.state = ProcessState.PROCESSING
    if (arg) this.setArg(arg)
  }

  success(arg: ProcessArg) {
    this.state = ProcessState.SUCCESS
    this.setArg(arg)
  }

  error(arg: ProcessArg) {
    this.state = ProcessState.ERROR
    this.setArg(arg)
  }

  clear() {
    this.state = ProcessState.NONE
    this.task = ''
    this.title = ''
    this.message = ''
  }
}
