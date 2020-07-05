<template>
  <div class="page">
    <div class="sub-bar elevation-1">
      <div>Settings</div>
    </div>
    <div class="icon-area">
      <v-icon size="80" style="opacity: 0.3;">mdi-cog</v-icon>
      <v-icon size="160" style="opacity: 0.25;">mdi-cog-outline</v-icon>
      <v-icon size="240" style="opacity: 0.2;">mdi-cog</v-icon>
      <v-icon size="400" style="opacity: 0.1;">mdi-cog-outline</v-icon>
    </div>
    <div class="page--bottom page--full">
      <v-container>
        <div class="row">
          <span class="label">Remove all event data.</span>
          <v-btn class="error" large @click="clearEvent">
            Clear Events
          </v-btn>
        </div>
        <div class="row">
          <span class="label">Remove all user data.</span>
          <v-btn class="error" large @click="clearUser">
            Clear Users
          </v-btn>
        </div>
      </v-container>
    </div>
    <ProcessDialog :value="process" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import ProcessModel from '~/components/notify/ProcessModel'
import ProcessDialog from '~/components/notify/ProcessDialog.vue'

const API_URL = `${process.env.SERVER_URL}api/`

@Component({ components: { ProcessDialog } })
export default class Settings extends Vue {
  process = new ProcessModel()

  async clearEvent() {
    const { process } = this
    process
      .confirm({
        title: 'Clear Event',
        message: 'Do you really want to clear the event?',
      })
      .done(async () => {
        try {
          process.processing()
          await axios.post(`${API_URL}events/clear`)
          process.success({
            message: 'Events cleared successfully.',
          })
        } catch (res) {
          process.error({ message: res.toJSON().message })
        }
      })
  }

  async clearUser() {
    const { process } = this
    process
      .confirm({
        title: 'Clear User',
        message: 'Do you really want to clear the user?',
      })
      .done(async () => {
        try {
          process.processing()
          await axios.post(`${API_URL}user/clear`)
          process.success({
            message: 'Users cleared successfully.',
          })
        } catch (res) {
          process.error({ message: res.toJSON().message })
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.add-area .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 22px 12px 32px;

  .v-btn {
    margin-left: 32px;
  }
}

.icon-area {
  height: 260px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 64px;
}

.page--bottom {
  padding: 14px 28px;
  z-index: 1;
}

.label {
  opacity: 0.6;
  font-size: 1.1rem;
  letter-spacing: 1px;
}
.row {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 8px;
}

.v-btn.error {
  min-width: 146px;
}
</style>
