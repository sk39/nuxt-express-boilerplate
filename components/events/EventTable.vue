<template>
  <v-data-table
    :items="list"
    :headers="headers"
    :loading="loading"
    :item-class="rowClass"
    dense
  >
    <template v-slot:item.status="{ item }">
      <div class="status-cell" :class="item.status">
        <span>{{ item.status }}</span>
      </div>
    </template>
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
    { text: 'Message', value: 'message', width: '50%', align: '' },
    { text: 'Status', value: 'status', align: '' },
  ]
}
</script>

<style lang="scss" scoped>
.status-cell {
  font-weight: 500;
  &.SUCCESS {
    color: $color_success;
  }
  &.ERROR {
    color: $color_error;
  }
}
</style>
