<template>
  <div class="logo">
    <SvgIcon :style="{ width: size + 'px', height: size + 'px' }" />
    <span class="logo-text" :style="{ fontSize: textSize + 'px' }">
      nuxt-express
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SvgIcon from '~/assets/img/nuxt.svg'

@Component({ components: { SvgIcon } })
export default class Logo extends Vue {
  @Prop({ default: 44 })
  size!: number

  @Prop({ default: 20 })
  textSize!: number
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  color: $color_theme;
  margin-left: 12px;
  letter-spacing: 2px;
  font-weight: 700;
}
</style>
