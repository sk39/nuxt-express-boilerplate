<template>
  <v-overlay :value="show">
    <div class="container">
      <div class="message">{{ message }}</div>
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: {} })
export default class PageLoading extends Vue {
  @Prop({ type: Boolean })
  show?: boolean

  @Prop({ type: String, default: 'Loading...' })
  message?: string
}
</script>

<style lang="scss" scoped>
.message {
  opacity: 0.6;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 500;
}

.container {
  min-width: 320px;
  margin-bottom: 1.4rem;
}
</style>
