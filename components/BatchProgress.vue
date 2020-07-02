<template>
  <div class="BatchProgress">
    <div v-show="running">
      <div class="taskName">{{ task }} is running</div>
      <v-progress-linear
        color="primary"
        :buffer-value="progress"
        :value="progress"
        stream
        rounded
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { batchStore } from '~/store'

@Component({ components: {} })
export default class BatchProgress extends Vue {
  get running() {
    return (
      batchStore.currentTask &&
      batchStore.currentTask !== '' &&
      batchStore.progress != null
    )
  }

  get task() {
    return batchStore.currentTask
  }

  get progress() {
    return batchStore.progress
  }
}
</script>

<style lang="scss" scoped>
.BatchProgress {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.taskName {
  opacity: 0.6;
  padding: 0 8px 8px;
  font-weight: 500;
}
</style>
