<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <div class="has-text-centered">
          <button class="button" @click="alterarTema">
            {{testoBotao}}
          </button>
        </div>
        <nav class="panel mt-5">
          <ul>
            <li>
              <router-link to="/" class="link"><i class="fas fa-tasks"></i>tarefas</router-link>
            </li>
            <li>
              <router-link to="/projetos" class="link"><i class="fas fa-project-diagram"></i>projetos</router-link>
            </li>
          </ul>

        </nav>

    </header>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BarraLateral',
  emits:['aoTemaAlterado'],
  data () {
    return {
      modoEscuro: false
    }
  },
  computed: {
    testoBotao () {
      if (this.modoEscuro) {
        return 'Modo Claro'
      }
      return 'Modo Escuro'
    }
  },
  methods: {
    alterarTema (){
      this.modoEscuro = !this.modoEscuro
      this.$emit('aoTemaAlterado', this.modoEscuro)
    }
  }
})

</script>


<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>