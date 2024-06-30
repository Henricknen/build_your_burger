<template>
    <div class = "message-container">
        <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: "Message",
    props: {
        msg: {
            type: [Number, String], // Aceita tanto números quanto strings
            required: true
        }
    }
}
    
</script>

<style scoped>
    .message-container {
        color: #004885;
        background-color: #CCE5FF;
        border: 2px solid #88DAFF;
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 30px auto;
    }
</style>
