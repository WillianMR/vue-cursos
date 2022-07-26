<template>
    <Box >
        <div class="columns" >
            <div class="column is-10 is-flex clicavel" @click="tarefaClicada">
                <div class="column is-5">
                    {{tarefa.descricao || "Tarefa sem descrição"}}
                </div>
                <div class="column">
                    <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
                </div>
                <div class="column is-2">
                    {{tarefa.projeto?.nome || "Sem projeto"}}
                </div>
            </div>
            <div class="column is-2">
                <router-link :to="`/${tarefa.id}`" class="button">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                </router-link>
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>

</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";
import { useStore } from '@/store';
import { TipoNotificacao } from "@/interfaces/INotificacao";
// import { notificacaoMixin } from "@/mixins/notificar";
import useNotificador from '@/hooks/notificador'
import { REMOVER_TAREFA } from "@/store/tipo-acoes";

export default defineComponent({
    name:'Tarefa-Realizada',
    components: { Cronometro, Box },
    emits: ['aoTarefaClicada'],
    // mixins: [notificacaoMixin],
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup (props,{emit}) {
        const store = useStore()
        const { notificar } = useNotificador()

        const excluir = (id:string) => {
            store.dispatch(REMOVER_TAREFA,id)
            .then(() => {
                notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa excluída com sucesso!")
            })
            .catch(() => {
                notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos apagar a tarefa")
            })
        }

        const tarefaClicada =  () => {
            emit('aoTarefaClicada', props.tarefa)
        }


        return {
            // store
            excluir,
            tarefaClicada
        }
    },
    // methods: {
    //     excluir (id:string){
    //         this.store.dispatch(REMOVER_TAREFA,id)
    //         .then(() => {
    //             this.notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa excluída com sucesso!")
    //         })
    //         .catch(() => {
    //             this.notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos apagar a tarefa")
    //         })
    //     },
    //     tarefaClicada (): void{
    //         this.$emit('aoTarefaClicada', this.tarefa)
    //     },

    // }
})
</script>

<style scoped>
.clicavel{
    cursor: pointer;
}
</style>