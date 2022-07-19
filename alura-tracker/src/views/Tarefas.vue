<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
        Você ainda não tem tarefas!
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';


export default defineComponent({
    name: "Tarefas-View",
    components: {  Formulario, Tarefa, Box },
    data () {
      return {
        tarefas: [] as ITarefa[],
      }
    },
    computed: {
      listaEstaVazia(): boolean{
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa (tarefa: ITarefa){
        this.tarefas.push(tarefa)
      },

    }
});

</script>