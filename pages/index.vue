<template>
  <div>
    <div class="sub-bar elevation-1">
      <div>Home</div>
    </div>
    <v-container>
      <v-btn :disabled="batchProcessing" @click="batchExample">
        batch example
      </v-btn>
      <v-btn @click="test">Test</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ImageUploader from '~/components/image/ImageUploader.vue'
import axios from 'axios'
import { batchStore } from '~/store'

const API_URL = `${process.env.SERVER_URL}api/`

@Component({ components: { ImageUploader } })
export default class Index extends Vue {
  get batchProcessing() {
    return batchStore.processing
  }

  async batchExample() {
    try {
      const res = await axios.post(`${API_URL}batch/example`)
      console.log('res', res)
    } catch (res) {
      console.error(res.toJSON())
    }
  }

  async test() {
    try {
      const res = await axios.post(`${API_URL}test`)
      console.log('res', res)
    } catch (res) {
      console.error(res.toJSON())
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.link {
  margin: 12px 0;
  font-size: 1.2rem;
}
</style>
