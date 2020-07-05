<template>
  <div class="page">
    <div class="sub-bar elevation-1">
      <div>Events</div>
    </div>
    <div class="add-area">
      <v-container>
        <v-text-field
          v-model="newEvent.message"
          :disabled="posting"
          label="Event Message"
        />
        <v-btn
          color="primary"
          :loadgin="posting"
          :disabled="!newEvent.message || newEvent.message.length === 0"
          @click="addEvent"
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </div>
    <div class="page--bottom page--full list-area">
      <EventTable :list="events" :loading="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import EventTable from '~/components/events/EventTable.vue'
import axios from 'axios'
import Subscriber from '~/utils/sucscriber'

const API_URL = `${process.env.SERVER_URL}api/`

@Component({ components: { EventTable } })
export default class Events extends Vue {
  loading = false
  posting = false
  disposers = []
  events = []
  newEvent = {
    type: 'Client',
    message: '',
  }

  mounted() {
    const { disposers } = this
    disposers.push(
      Subscriber.subscribe('events', (data) => {
        let newEvent = Object.assign({}, data, {
          newRow: true,
        })
        this.events.unshift(newEvent)
        setTimeout(() => (newEvent.newRow = false), 1800)
      })
    )
    this.load()
  }

  beforeDestroy() {
    this.disposers.forEach((disposer) => disposer())
  }

  async load() {
    try {
      this.loading = true
      const res: any = await axios.get(`${API_URL}events`)
      this.events = res.data.list
    } catch (res) {
      console.error(res.toJSON())
    } finally {
      this.loading = false
    }
  }

  async addEvent() {
    try {
      this.posting = true
      const res = await axios.post(`${API_URL}events`, this.newEvent)
      this.newEvent.message = ''
      console.log('res', res)
    } catch (res) {
      console.error(res.toJSON())
    } finally {
      this.posting = false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-area .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 22px 32px 32px;
  .v-btn {
    margin-left: 32px;
  }
}
.list-area {
  padding: 14px 28px;
}
</style>
