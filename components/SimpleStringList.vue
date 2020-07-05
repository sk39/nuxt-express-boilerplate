<template>
  <div class="StringVList">
    <div
      v-for="item in items"
      :key="item.id"
      class="list-item"
      :class="item.class"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: {} })
export default class SimpleStringList extends Vue {
  @Prop()
  list: string[]

  get items() {
    return this.list
  }
}
</script>

<style lang="scss" scoped>
@keyframes add-list-row-anime {
  0% {
    color: $color_theme;
  }
  100% {
    color: $color_base_text;
  }
}

.StringVList {
  height: 400px;
  overflow-y: scroll;
  padding: 16px 24px;
  border: thin solid $color_theme;
  font-size: 0.8rem;
}

.list-item {
  animation: add-list-row-anime 0.3s ease-in-out;
  &.error-text {
    color: $color_error;
  }
}
</style>
