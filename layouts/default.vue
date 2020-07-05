<template>
  <v-app>
    <v-app-bar class="elevation-0" fixed app>
      <Logo />
      <div class="link-group">
        <nuxt-link class="header-link" to="/" exact>
          Home
        </nuxt-link>
        <nuxt-link class="header-link" to="/events" exact>
          Events
        </nuxt-link>
        <nuxt-link class="header-link" to="/users" exact>
          Users
        </nuxt-link>
        <nuxt-link class="header-link" to="/settings" exact>
          Settings
        </nuxt-link>
      </div>
      <!--      <v-spacer />-->
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
import BatchProgress from '~/components/notify/BatchProgress.vue'

@Component({ components: { Logo, BatchProgress } })
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.link-group {
  padding: 0 20px 0 60px;
}

.header-link {
  text-decoration: none;
  color: $color_theme_dark1 !important;
  padding: 8px 4px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 16px;
  opacity: 0.43;
  position: relative;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    opacity: 1;

    @keyframes show-to-top {
      0% {
        opacity: 0;
        transform: translateY(4px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 18px;
      height: 2px;
      left: 4px;
      /*right: 0;*/
      border-radius: 20px;
      background: rgba($color_theme, 0.7);
      animation: show-to-top 0.5s ease-in-out;
    }
  }
}
</style>
