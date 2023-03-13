<template>
    <div class="block">
        <slot></slot>
    </div>
</template>

<script>
    export default {
       name: 'content-block' 
    }
</script>

<style scoped>
.block{
    width: 100%;
    box-sizing: border-box;
    padding: 6px 12px;
    height: auto;
}
</style>