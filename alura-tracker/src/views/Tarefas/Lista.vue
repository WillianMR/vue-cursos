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
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" id="descricaoDaTarefa" v-model="tarefaSelecionada.descricao" />
                </div>
            </template>
            <template v-slot:rodape>
                <button @click="editarDescricao" class="button is-success">Salvar alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </template>
        </Modal>
    </div>

</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Tarefa from '../../components/Tarefa.vue';
import Box from '../../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from '@/interfaces/INotificacao';
import Modal from '@/components/Modal.vue';


export default defineComponent({
    name: "Lista-Tarefas",
    components: { Tarefa, Box, Modal },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    methods: {
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        editarDescricao() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => {
                    this.fecharModal()
                    this.notificar(TipoNotificacao.SUCESSO, "Pronto", "Descrição da tarefa atualizada!")
                })
        }
    },
    setup() {

        const filtro = ref("")
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        const { notificar } = useNotificador()

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter(
        //     t => !filtro.value || t.descricao.toLocaleLowerCase().includes(filtro.value.toLocaleLowerCase())
            
        //     ))
        
        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS,filtro.value)
        })

        return {
            // tarefas,
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            notificar,
            filtro
        }
    },

});

</script>
