<template>
    <div class="tarefas">
      <h1 class="title">Tarefas</h1>
      <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ITarefa from '../interfaces/ITarefa';



export default defineComponent({
    name: "Tarefas-View",
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

<style scoped>
.tarefas {
  padding: 1.25rem;
}
</style>