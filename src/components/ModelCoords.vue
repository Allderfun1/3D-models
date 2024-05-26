<script lang="ts">
export default {
    props: {
        modelPositionChange: {
            type: Function,
            required: true
        }
    },
    setup() {
        const coords: object = {
            x: 0,
            y: 0,
            z: 0
        }

        return { coords }
    }
}
</script>

<template>
    <form>
        <label><span class="coord-x">X:</span><input type="number" v-model="coords.x"></label>
        <label><span class="coord-y">Y:</span><input type="number" v-model="coords.y"></label>
        <label><span class="coord-z">Z:</span><input type="number" v-model="coords.z"></label>
        <div class="apply-button" @click="modelPositionChange(coords)">Применить</div>
    </form>
</template>

<style scoped lang="sass">
form 
    position: fixed
    inset: 10px auto auto 240px
    background: #fff
    width: 250px
    padding: 20px
    border: solid #00000030 1px

    label 
        display: flex
        align-items: center
        gap: 5px
        width: 100%

        &:nth-child(n + 2)
            margin-top: 5px

        span
            font-weight: 600

        span.coord-x
            color: red

        span.coord-y
            color: green

        span.coord-z
            color: blue

        input
            display: block
            border: none
            background: #85aaff40
            cursor: pointer
            transition: filter .2s linear
            padding: 7px 10px
            border-radius: 5px
            width: 100%

            &:focus
                outline: none

            &:hover
                filter: brightness(80%)

    .apply-button 
        border: none
        background: #2164FF
        color: #fff
        cursor: pointer
        font-weight: 600
        transition: filter .2s linear
        padding: 7px 10px
        border-radius: 5px
        margin-top: 5px
        font-size: 14px
        text-align: center

        &:hover
            filter: brightness(80%)
</style>