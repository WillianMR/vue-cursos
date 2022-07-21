<template>
    <Box>
        <div class="columns">
            <div class="column is-5">
                {{tarefa.descricao || "Tarefa sem descrição"}}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column is-2">
                {{tarefa.projeto?.nome || "Sem projeto"}}
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
import { REMOVE_TAREFA } from "@/store/tipo-mutacoes";
import { useStore } from '@/store';
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
    name:'Tarefa-Realizada',
    components: { Cronometro, Box },
    mixins: [notificacaoMixin],
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup () {
        const store = useStore()
        return {
            store
        }
    },
    methods: {
        excluir (id:string){
            this.store.commit(REMOVE_TAREFA,id)
            this.notificar(TipoNotificacao.FALHA,"Pronto","Tarefa excluída com sucesso!")
        }
    }
})
</script>

