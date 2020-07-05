<template>
  <div class="page">
    <div class="sub-bar elevation-1">
      <div>Error</div>
    </div>
    <v-container class="text-center">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 66px;
  opacity: 0.7;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px;
  color: $color_error;
}
.text-center {
  padding-top: 66px;
}
</style>
