import Vue from 'vue'
import axios from 'axios'

function getExtension(imageUrl: string) {
  return imageUrl.split('.').pop()
}

function setImgSrc(el: any, binding: any) {
  if (!binding.value || binding.value === '' || binding.value === binding.oldValue) {
    return
  }

  const imageUrl = binding.value
  axios({
    method: 'GET',
    url: imageUrl,
    responseType: 'arraybuffer'
  })
    .then(resp => {
      const mimeType = `image/${getExtension(imageUrl)}`
      const imgBase64 = new Buffer(resp.data, 'binary').toString('base64')
      el.src = `data:${mimeType};base64,${imgBase64}`
    })
    .catch(() => el.src = imageUrl)
}


Vue.use({
  install(Vue: any) {
    Vue.directive('ajax-image', {
      bind: function(el, binding) {
        setImgSrc(el, binding)
      },
      componentUpdated: function(el, binding) {
        setImgSrc(el, binding)
      }
    })
  }

})
