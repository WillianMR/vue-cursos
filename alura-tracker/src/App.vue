<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }" >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-tree-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
          Você ainda não tem tarefas!
        </Box>
      </div>
    </div>
    
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';


export default defineComponent({
    name: "App",
    components: { BarraLateral, Formulario, Tarefa, Box },
    data () {
      return {
        tarefas: [] as ITarefa[],
        modoEscuro: false
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
      trocarTema(modoEscuro: boolean){
        this.modoEscuro = modoEscuro
      }

    }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main{
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro{
  --bg-primario: #2B2D42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
