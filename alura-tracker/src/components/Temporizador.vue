<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
        <Botao icone="fas fa-play" texto="play" @clicado="iniciar" :desabilitado="cronometroRodando" />
        <Botao icone="fas fa-stop" texto="stop" @clicado="finalizar" :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cronometro from "./Cronometro.vue";
import Botao from './Botao.vue';
export default defineComponent({
    name: "Temporizador-Tarefa",
    emits: ['aoTemporizadorFinalizado'],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },
    
    components: { Cronometro, Botao },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
        },
        finalizar() {
            this.$emit('aoTemporizadorFinalizado',this.tempoEmSegundos)
            clearInterval(this.cronometro);
            this.cronometroRodando = false;
            this.tempoEmSegundos = 0
        }
    },

});
</script>