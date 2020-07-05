<template>
  <div class="page">
    <div class="sub-bar elevation-1">
      <div>Home</div>
    </div>
    <div class="page--full">
      <v-container>
        <div class="date-title-area">
          <span>Data stream</span>
          <v-btn icon @click="list = []">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
        <SimpleStringList :list="list" />
      </v-container>
    </div>
    <div class="page--bottom">
      <v-container>
        <v-btn
          class="col-btn"
          :loading="processingName === 'batchExample'"
          :disabled="batchProcessing"
          @click="batchExample"
        >
          <v-icon>mdi-chevron-right-box-outline</v-icon>
          <span>Batch example</span>
        </v-btn>
        <v-btn
          class="col-btn"
          :loading="processingName === 'test'"
          @click="test"
        >
          <v-icon>mdi-greater-than-or-equal</v-icon>
          <span>Test Api</span>
        </v-btn>
        <v-btn
          class="col-btn"
          :loading="processingName === 'testError'"
          @click="testError"
        >
          <v-icon>mdi-alert-circle-outline</v-icon>
          <span>Test Api Error</span>
        </v-btn>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ImageUploader from '~/components/image/ImageUploader.vue'
import axios from 'axios'
import { batchStore } from '~/store'
import Subscriber from '~/utils/sucscriber'
import SimpleStringList from '~/components/SimpleStringList.vue'
import _ from 'underscore'

const API_URL = `${process.env.SERVER_URL}api/`

@Component({ components: { ImageUploader, SimpleStringList } })
export default class Index extends Vue {
  list = []
  disposers = []
  dataIndex = 0
  processingName: string = null

  get batchProcessing() {
    return batchStore && batchStore.processing
  }

  mounted() {
    const { disposers } = this
    disposers.push(
      Subscriber.subscribe(
        'events',
        _.debounce((d) => {
          this.add(
            `Event: ${d.date} ${d.type} ${d.message} ${d.status}`,
            'event'
          )
        }, 10)
      )
    )
    disposers.push(
      Subscriber.subscribe(
        'batch-stat',
        _.debounce((d) => {
          this.add(
            `BatchStat: ${d.taskName} ${d.progress.toFixed(1)}%`,
            'batch'
          )
        }, 10)
      )
    )
  }

  beforeDestroy() {
    this.disposers.forEach((disposer) => disposer())
  }

  add(text, clazz) {
    this.list.unshift({
      id: this.dataIndex++,
      text,
      class: clazz,
    })
  }

  async batchExample() {
    try {
      this.processingName = 'batchExample'
      const res = await axios.post(`${API_URL}batch/example`)
      this.add(JSON.stringify(res.data), 'API')
    } catch (res) {
      this.add(
        `Batch API Failed. ${JSON.stringify(res.toJSON().message)}`,
        'API'
      )
    } finally {
      this.processingName = null
    }
  }

  async test() {
    try {
      this.processingName = 'test'
      const res = await axios.post(`${API_URL}test`)
      this.add(`Test API success. ${JSON.stringify(res.data.message)}`, 'API')
    } catch (res) {
      this.add(
        `Test API Failed. ${JSON.stringify(res.toJSON().message)}`,
        'API Error'
      )
    } finally {
      this.processingName = null
    }
  }

  async testError() {
    try {
      this.processingName = 'testError'
      const res = await axios.post(`${API_URL}test/error/400`)
      this.add(`Test API success. ${JSON.stringify(res.data.message)}`, 'API')
    } catch (res) {
      this.add(
        `Test API Failed. ${JSON.stringify(res.toJSON().message)}`,
        'API error-text'
      )
    } finally {
      this.processingName = null
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

.page--bottom {
  padding: 32px 0;
}

.col-btn {
  width: 180px;
  margin: 12px;
}

.date-title-area {
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 12px 0 6px;
  .v-btn {
    margin-left: 8px;
  }
}
</style>
