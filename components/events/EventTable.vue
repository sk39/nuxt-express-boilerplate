<template>
  <v-data-table
    :items="list"
    :headers="headers"
    :loading="loading"
    :item-class="rowClass"
    dense
  >
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({ components: {} })
export default class EventTable extends Vue {
  @Prop()
  list!: any[]

  @Prop({ type: Boolean })
  loading?: boolean

  rowClass(item) {
    return item.newRow ? 'new-row' : ''
  }

  headers = [
    { text: 'Date', value: 'date', align: '' },
    { text: 'Type', value: 'type', align: '' },
    { text: 'Message', value: 'message', align: '' },
    { text: 'Status', value: 'status', align: '' },
  ]
}
</script>
