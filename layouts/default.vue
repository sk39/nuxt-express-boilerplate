<template>
  <v-app>
    <v-app-bar class="elevation-0" fixed app>
      <Logo></Logo>

      <div class="link-group">
        <nuxt-link class="header-link" to="/" exact>
          Home
        </nuxt-link>
        <nuxt-link class="header-link" to="/events" exact>
          Events
        </nuxt-link>
      </div>
      <v-spacer />
      <BatchProgress />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import BatchProgress from '~/components/BatchProgress.vue'

@Component({ components: { Logo, BatchProgress } })
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.link-group {
  padding: 0 20px 0 50px;
}

.header-link {
  text-decoration: none;
  color: $color_theme_dark1 !important;
  padding: 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 18px;
  opacity: 0.43;
  position: relative;

  &.nuxt-link-active {
    opacity: 1;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      width: 18px;
      height: 2px;
      left: 0;
      /*right: 0;*/
      border-radius: 20px;
      background: rgba($color_theme, 0.7);
    }
  }
}
</style>
