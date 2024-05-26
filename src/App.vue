<script lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, TransformControls } from '@tresjs/cientos'

import Model from './components/Model.vue'
import Menu from './components/Menu.vue'
import AddForm from './components/AddForm.vue'
import ModelCoords from './components/ModelCoords.vue'

interface Model {
  server_file_name: string;
  user_file_name: string;
  status: boolean;
}

export default {
  components: { Model, Menu, AddForm, ModelCoords, TresCanvas, OrbitControls, TransformControls },
  setup() {
    const modalWindowVisible = ref<boolean>(false)
    const modalWindowVisibleChange = (val: boolean) => modalWindowVisible.value = val

    const modelsList = ref<array>([])
    const modelsListAdd = (obj: Model) => modelsList.value.push(obj)
    const modelsListRemove = (index: number) => modelsList.value.splice(index, 1)
    const statusChange = (index: number) => {
      modelsList.value.map(obj => obj.status = false)
      modelsList.value[index].status = true
    }

    const gl: { clearColor: string, shadows: boolean, alpha: boolean, windowSize: boolean } = {
      clearColor: '#fff',
      shadows: true,
      alpha: false,
      windowSize: true,
    }
    const cameraPosition: number[] = [7, 7, 7]

    const modelKey = ref<number>(0)
    const ModelCoordsKey = ref<number>(0)
    const modelRef = shallowRef<any>()

    const modelPosition = {
      x: ref(0), 
      y: ref(0), 
      z: ref(0),
    }
    const modelPositionChange = (coords: object) => {
      modelPosition.x.value = +coords.x
      modelPosition.y.value = +coords.y
      modelPosition.z.value = +coords.z
      ModelCoordsKey.value++
    }

    watch(modelsList.value, () => modelKey.value++)
    watch(modelPosition.x, () => modelRef.value.position.x = modelPosition.x.value)
    watch(modelPosition.y, () => modelRef.value.position.y = modelPosition.y.value)
    watch(modelPosition.z, () => modelRef.value.position.z = modelPosition.z.value)

    return { gl, cameraPosition, modelPosition, modelPositionChange, modelRef, modelKey, ModelCoordsKey, modalWindowVisible, modalWindowVisibleChange, modelsList, modelsListAdd, modelsListRemove, statusChange }
  }
}
</script>

<template>
  <div class="outer-container">
    <Menu :modalWindowVisibleChange="modalWindowVisibleChange" :modelsListRemove="modelsListRemove" :statusChange="statusChange" :modelsList="modelsList" />
    <ModelCoords v-if="modelsList.filter(obj => obj.status).length" :modelPositionChange="modelPositionChange" :key="ModelCoordsKey" />
    <div class="models-field">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="cameraPosition" :look-at="[0, 2, 0]" />
        <OrbitControls make-default />
        <TresMesh ref="modelRef" :key="modelKey">
          <Suspense v-if="modelsList.filter(obj => obj.status).length">
            <Model :modelFileName="modelsList.filter(obj => obj.status)[0].server_file_name" />
          </Suspense>
        </TresMesh>
        <TransformControls v-if="modelsList.filter(obj => obj.status).length" :object="modelRef" />
        <TresDirectionalLight :intensity="3" />
        <TresGridHelper />
      </TresCanvas>
    </div>
  </div>
  <AddForm v-if="modalWindowVisible" :modalWindowVisibleChange="modalWindowVisibleChange" :modelsListAdd="modelsListAdd" />
</template>

<style scoped lang="sass">
.outer-container
  display: flex
  width: 100%
  height: 100%

.models-field
  height: 100%
  flex-grow: 1

  >*
    width: 100%!important
    height: 100%!important
    position: static!important
    object-fit: cover
</style>