<template>
  <div>
    <div>
      <v-file-input show-size v-model="file" accept="image/png,image/jpeg" />
      <v-btn color="primary" @click="upload">
        Upload
      </v-btn>
    </div>
    <div>
      <img v-ajax-image="uploadedFilePath" />
      <v-btn color="primary" @click="upload2">
        upload2
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/'

@Component({ components: {} })
export default class ImageUploader extends Vue {
  file: File = null
  uploadedFilePath: string = ''

  async upload() {
    const formData = new FormData()
    formData.append('file', this.file, this.file.name)

    axios.post(API_URL + 'upload', formData).then((res: any) => {
      console.log('res', res.data)
      this.uploadedFilePath = API_URL + 'download/' + res.data.fileName
    })
  }

  async upload2() {
    const formData = new FormData()
    formData.append('file', this.file, this.file.name)
    fetch(API_URL + 'upload', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json, application/xml, text/html, *.*',
        Authorization: 'Bearer sjfldsjflsjfldj',
      },
      body: formData,
    }).then(async (res) => {
      const data = await res.json()
      this.uploadedFilePath = API_URL + 'download/' + data.fileName
    })
  }
}
</script>

<style lang="scss" scoped></style>
