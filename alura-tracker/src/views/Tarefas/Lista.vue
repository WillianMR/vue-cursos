<template>
    <router-link to="/nova" class="button">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Nova Tarefa</span>
    </router-link>
    <div class="lista">
        <Box v-if="tarefas.length === 0">
            Você ainda não tem tarefas!
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada" >
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" id="descricaoDaTarefa" v-model="tarefaSelecionada.descricao" />
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="editarDescricao" class="button is-success">Salvar alterações</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Tarefa from '../../components/Tarefa.vue';
import Box from '../../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from '@/interfaces/INotificacao';


export default defineComponent({
    name: "Lista-Tarefas",
    components: { Tarefa, Box },
    data () {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        selecionarTarefa(tarefa:ITarefa){
            this.tarefaSelecionada = tarefa
        },
        fecharModal(){
            this.tarefaSelecionada = null
        },
        editarDescricao(){
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => {
                    this.fecharModal()
                    this.notificar(TipoNotificacao.SUCESSO,"Pronto","Descrição da tarefa atualizada!")
                })
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        const { notificar } = useNotificador()
        return {
            tarefas: computed(() => store.state.tarefas),
            store,
            notificar
        }
    },

});

</script>
