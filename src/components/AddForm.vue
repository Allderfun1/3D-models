<script lang="ts">
import { ref } from 'vue'
import axios from 'axios'

export default {
    props: {
        modalWindowVisibleChange: {
            type: Function,
            required: true
        },
        modelsListAdd: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const modelFileInput = ref(null)

        async function saveFile() {
            const  fileFormData = new FormData()
            fileFormData.append('file', modelFileInput.value!.files![0])
            await axios.post('http://localhost:3000/upload', fileFormData).then(response => {
                props.modelsListAdd({
                    server_file_name: response.data.fileName,
                    user_file_name: modelFileInput.value!.files![0].name,
                    status: false
                });
                props.modalWindowVisibleChange(false);
            })
        }

        return { modelFileInput, saveFile }
    }
}
</script>

<template>
    <div class="modal-window-container">
        <div class="darker" @click="modalWindowVisibleChange(false)"></div>
        <form @submit.prevent="saveFile()" enctype="multipart/form-data">
            <input type="file" ref="modelFileInput" required>
            <button>Загрузить</button>
        </form>
    </div>
</template>

<style scoped lang="sass">
.modal-window-container
    position: fixed
    inset: 0
    width: 100%
    height: 100%

    .darker
        width: 100%
        height: 100%
        background: #00000050

    form
        position: fixed
        inset: 50% auto auto 50%
        display: flex
        flex-direction: column
        gap: 10px
        border: solid #2164FF 2px
        border-radius: 15px
        transform: translate(-50%, -50%)
        width: 350px
        max-width: 100%
        padding: 10px
        height: auto
        background: #fff

        input[type="file"]
            width: 100%
            height: 2rem
            position: relative
            cursor: pointer
            display: inline-block
            vertical-align: middle
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out

        input[type="file"]::-webkit-file-upload-button
            visibility: hidden

        input[type="file"]::before
            content: 'Выберите файл'
            display: inline-block
            border: none
            background: #2164FF
            color: #fff
            cursor: pointer
            font-weight: 600
            transition: filter .2s linear
            padding: 7px 10px
            border-radius: 5px

            &:hover
                filter: brightness(80%)

        button 
            border: none
            background: #2164FF
            color: #fff
            cursor: pointer
            font-weight: 600
            transition: filter .2s linear
            padding: 7px 10px
            border-radius: 5px

            &:hover
                filter: brightness(80%)
</style>