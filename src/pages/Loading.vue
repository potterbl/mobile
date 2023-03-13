<template>
    <div class="wrapper">
        <img src="@/assets/Logo.png" alt="Logo" class="logo">
        <div class="text">
            <h1>Dental Clinic</h1>
            <p class="body__regular">Your dental care here</p>
        </div>
        <img src="@/assets/Loading.png" alt="Loading" class="loading">
    </div>
</template>

<script>
    export default {
        name: 'loading-page',

        mounted() {
            setTimeout(() => {
                this.$router.push('/registration')
            }, 3000);
        }
    }
</script>

<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: calc(100vh - env(safe-area-inset-bottom));
}
.text{
    margin-top: 48px;
    color: #0066FF;
    margin-bottom: 147px;
}
.text h1{
    margin-bottom: 6px;
}
.loading{
    animation: loading .8s infinite ease-in-out;
}
@keyframes loading {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>