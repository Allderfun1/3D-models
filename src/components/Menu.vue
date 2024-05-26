<script lang="ts">
import axios from 'axios'

export default {
    props: {
        statusChange: {
            type: Function,
            required: true
        },
        modalWindowVisibleChange: {
            type: Function,
            required: true
        },
        modelsListRemove: {
            type: Function,
            required: true
        },
        modelsList: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        async function removeFile(index: number) {
            await axios.post('http://localhost:3000/delete', { fileName: props.modelsList[index].server_file_name })
            props.modelsListRemove(index)
        }

        return { removeFile }
    }
}
</script>

<template>
    <div class="menu-container">
        <h2><span class="blue-text">3D</span> Модели</h2>
        <span v-show="modelsList.length && !modelsList.filter(obj => obj.status).length" class="hint">Кликните на нужную модель</span>
        <ul>
            <li v-if="modelsList.length" v-for="(modelItem, index) of modelsList" :key="index" :class="{ active: modelItem.status }" @click="(!modelItem.status) ? statusChange(index) : null">
                {{ modelItem.user_file_name }}
                <div class="remove-button" @click="removeFile(index)">&#10006;</div>
            </li> 
            <li class="no-models__li" v-else><span class="hint">Загрузите модели</span></li>
        </ul>
        <div class="add-button" @click="modalWindowVisibleChange(true)">+</div>
    </div>
</template>

<style scoped lang="sass">
.menu-container
    min-width: 230px
    background: #fff
    border-right: solid #00000030 1px
    padding: 10px

    h2
        font-size: 30px
        margin: 15px 15px 20px
        text-align: center
        letter-spacing: -1.2px
        font-weight: 600

        .blue-text
            color: #2164FF
            font-weight: 600

    .hint
        display: block
        height: 15px
        font-size: 10px
        opacity: 0.8
        text-align: center

    ul

        li
            position: relative
            display: block
            width: 100%
            padding: 7px 10px
            border-radius: 5px
            font-size: 14px
            background: #85AAFF70
            border: solid #00000000 2px
            transition: border-color .2s linear

            &:nth-child(n + 2)
                margin-top: 3px

            &:hover
                li:not(.no-models__li),
                li:not(.active)
                    border-color: lighten(#2164FF, 20%)

            .remove-button
                position: absolute
                inset: 0 0 0 auto
                display: flex
                justify-content: center
                align-items: center
                width: 31px
                height: 31px
                border-radius: inherit
                font-weight: 600
                color: #2164FF
                cursor: pointer
                transition: transform .2s linear

                &:hover
                    transform: rotate(90deg)

        li.no-models__li
            background: #85AAFF40
            text-align: center

        li.active
            border-color: #2164FF

    ul.active
        background: red

    .add-button
        display: block
        width: 100%
        padding: 7px 10px
        border-radius: 5px
        background: #2164FF
        margin-top: 3px
        color: #fff
        font-weight: 600
        text-align: center
        cursor: pointer
        transition: filter .2s linear

        &:hover
            filter: brightness(80%)
</style>