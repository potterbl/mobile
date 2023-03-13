<template>
    <button>
        Next
    </button>
</template>

<script>
    export default {
        name: 'next-button'
    }
</script>

<style scoped>
button{
    width: calc(100% - 8px);
    height: 49px;
    background-color: #0066FF;
    border-radius: 37px;
    color: white;
    border: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 86px;
    font-size: 16px;
}
</style>