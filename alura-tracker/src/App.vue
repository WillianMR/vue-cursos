<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }" >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-tree-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
    </div>
    
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';



export default defineComponent({
    name: "App",
    components: { BarraLateral, Notificacoes },
    data () {
      return {
        modoEscuro: false
      }
    },
    methods: {

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
