<template>
  <v-snackbar
    :value="show"
    absolute
    top
    right
    timeout="-1"
    elevation="24"
    style="opacity: 0.8;"
  >
    <div class="BatchProgress">
      <div class="taskName">{{ taskName }}</div>
      <v-progress-linear
        color="primary"
        :buffer-value="progress"
        :value="progress"
        stream
        rounded
      />
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { batchStore } from '~/store'

@Component({ components: {} })
export default class BatchProgress extends Vue {
  get task() {
    return batchStore.currentTask
  }

  get progress() {
    return batchStore.progress || 0
  }

  get taskName() {
    const { currentTask, processing } = batchStore
    if (currentTask) {
      return `${currentTask} is ${processing ? 'running' : 'done'}`
    } else {
      return ''
    }
  }

  get show() {
    const { currentTask } = batchStore
    return currentTask && currentTask !== ''
  }
}
</script>

<style lang="scss" scoped>
.BatchProgress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 0 12px;
}

.taskName {
  opacity: 0.6;
  padding: 0 0 20px;
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
