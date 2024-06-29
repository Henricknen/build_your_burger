<template>
    <footer id = "footer">
        <p>Pizzas &copy; 2024</p>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>
    #footer {
        height: 260px;
        background-color: #222;
        border-top: 4px solid #111;
        color: #FCBA03;
        display: flex;
        align-items: center;
        justify-content: center;
        /* bottom: 0; */
        width: 100%;
    }
</style>
