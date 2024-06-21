const profissional = {
    data() {
        return {
            nome: "Luis henrique s f",
            programador: "full stack",
            input_program: ""
        }
    },
    methods: {
        submitForm(e) {

            e.preventDefault();

            console.log(this.input_program);

            this.programador = this.input_program;

        }
    }
}

Vue.createApp(profissional).mount("#app");