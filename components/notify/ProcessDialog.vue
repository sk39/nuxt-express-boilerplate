<template>
  <v-dialog :value="show" persistent :max-width="width">
    <v-card :style="{ height: `${height}px` }" :class="dialogClass">
      <v-card-title>
        {{ value.title }}
      </v-card-title>

      <template v-if="value.state === 'CONFIRM'">
        <v-card-text class="dialog--body">
          <div class="message confirm-message">
            {{ value.message }}
          </div>
        </v-card-text>
        <v-card-actions class="dialog--bottom">
          <v-btn text @click="close">Cancel</v-btn>
          <div class="separator" />
          <v-btn text color="primary" @click="done">Done</v-btn>
        </v-card-actions>
      </template>

      <template v-else-if="value.state === 'PROCESSING'">
        <v-card-text class="dialog--body">
          <span>Processing...</span>
          <v-progress-linear indeterminate />
        </v-card-text>
      </template>

      <template v-else-if="value.state === 'SUCCESS'">
        <v-card-text class="dialog--body">
          <div class="message success-message">
            {{ value.message }}
          </div>
        </v-card-text>
        <v-card-actions class="dialog--bottom">
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </template>

      <template v-else-if="value.state === 'ERROR'">
        <v-card-text class="dialog--body">
          <div class="message error-message">
            {{ value.message }}
          </div>
        </v-card-text>
        <v-card-actions class="dialog--bottom">
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ProcessModel, { ProcessState } from '~/components/notify/ProcessModel'

@Component({ components: {} })
export default class ProcessDialog extends Vue {
  @Prop({ required: true })
  value: ProcessModel

  @Prop({ default: 480 })
  width: number

  @Prop({ default: 320 })
  height: number

  get show() {
    return this.value.state !== ProcessState.NONE
  }

  get dialogClass() {
    return `dialog dialog-${this.value.state}`
  }

  close() {
    this.$emit('close')
    this.value.clear()
  }

  done() {
    this.$emit('done')
    this.value.clickDone()
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  border: thin solid rgba(0, 0, 0, 0.12);
  .v-card__title {
    padding: 24px !important;
  }
}

.dialog--body {
  height: 100%;
}

.dialog--bottom {
  display: flex;
  justify-content: stretch;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0;
  .v-btn {
    height: 48px;
    flex: 1;
  }
}

.separator {
  background: rgba(0, 0, 0, 0.12);
  height: 48px;
  width: 1px;
}
.message {
  font-size: 1.2rem;
  &.confirm-message {
    opacity: 0.7;
  }
  &.error-message {
    color: $color_error;
  }
  &.success-message {
    color: $color_success;
  }
}
</style>
