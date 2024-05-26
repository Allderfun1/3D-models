<script lang="ts">
import { GLTFModel } from '@tresjs/cientos'

export default {
  components: { GLTFModel },
  props: {
    modelFileName: { 
      type: String,
      required: true
    }
  },
  setup(props) {
    const path: string = `/src/handler/uploads/${props.modelFileName}`;

    return { path }
  }
}
</script>

<template>
  <GLTFModel :path="path" />
</template>