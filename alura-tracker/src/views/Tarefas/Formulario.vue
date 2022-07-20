<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column" v-if="id">
                <button class="button" @click="atualizar()">Atualizar</button>
            </div>
            <div class="column" v-else>
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { ADICIONA_TAREFA } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";
import { useStore } from '@/store';
import Temporizador from "../../components/Temporizador.vue";
import { ATUALIZA_TAREFA } from "@/store/tipo-mutacoes";

export default defineComponent({
    name: "Formulario-Tarefa",
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        };
    },
    mounted (){
        if(this.id){
            const tarefa = this.store.state.tarefas.find(trf => trf.id == this.id)
            this.descricao = tarefa.descricao
            this.idProjeto = tarefa.projeto? tarefa.projeto.id : ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            let projeto = this.store.state.projetos.find(proj => proj.id == this.idProjeto)
            if(projeto === undefined){
                projeto = null
            }

            this.store.commit(ADICIONA_TAREFA, {
                descricao: this.descricao,
                duracaoEmSegundos: tempoDecorrido,
                projeto: projeto
            })


            this.$router.push('/')
        },

        atualizar (){
            const tarefa = this.store.state.tarefas.find(trf => trf.id == this.id)
            let projeto = this.store.state.projetos.find(proj => proj.id == this.idProjeto)
            if(projeto === undefined){
                projeto = null
            }
            tarefa.descricao = this.descricao
            tarefa.projeto = projeto
            this.store.commit(ATUALIZA_TAREFA, tarefa)
            this.$router.push('/')
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    },
    components: { Temporizador }
})

</script>

<style >
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>