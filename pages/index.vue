<template>
  <div class="page">
    <div class="sub-bar elevation-1">
      <div>Home</div>
    </div>
    <div class="page--full">
      <v-container>
        <div class="date-title-area">
          <span>Data stream</span>
          <v-btn color="primary" icon @click="list = []">
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
          :disabled="batchProcessing"
          @click="batchExample"
        >
          <v-icon>mdi-chevron-right-box-outline</v-icon>
          <span>batch example</span>
        </v-btn>
        <v-btn class="col-btn" @click="test">
          <v-icon>mdi-greater-than-or-equal</v-icon>
          <span>Test Api</span>
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

  get batchProcessing() {
    return batchStore && batchStore.processing
  }

  mounted() {
    const { disposers } = this
    disposers.push(
      Subscriber.subscribe(
        'events',
        _.debounce((d) => {
          this.add(`${d.date} ${d.type} ${d.message} ${d.status}`, 'event')
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
    // this.buffer.push(text)
    this.list.unshift({
      id: this.dataIndex++,
      text,
      class: clazz,
    })
  }

  async batchExample() {
    try {
      await axios.post(`${API_URL}batch/example`)
    } catch (res) {
      console.error(res.toJSON())
      this.add('Batch api is failed', 'API')
    }
  }

  async test() {
    try {
      await axios.post(`${API_URL}test`)
      this.add('Test api is success', 'API')
    } catch (res) {
      console.error(res.toJSON())
      this.add('Test api is failed', 'API')
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
  .v-icon {
    margin-left: 16px;
  }
}
</style>
