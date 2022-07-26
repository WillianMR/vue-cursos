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
import { computed, defineComponent, ref } from "vue";
import { useStore } from '@/store';
import Temporizador from "../../components/Temporizador.vue";
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Formulario-Tarefa",
    props: {
        id: {
            type: String
        }
    },
    // data() {
    //     return {
    //         descricao: '',
    //         idProjeto: ''
    //     };
    // },
    // mounted (){
    //     if(this.id){
    //         const tarefa = this.store.state.tarefa.tarefas.find(trf => trf.id == this.id)
    //         if(tarefa != undefined){
    //             this.descricao = tarefa.descricao
    //             this.idProjeto = tarefa.projeto? tarefa.projeto.id : ''
    //         }
    //     }
    // },
    // methods: {
    //     finalizarTarefa(tempoDecorrido: number): void {
    //         let projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.idProjeto)
    //         if(projeto == undefined){
    //             this.store.dispatch(CADASTRAR_TAREFA, {
    //                 descricao: this.descricao,
    //                 duracaoEmSegundos: tempoDecorrido,
    //                 projeto: projeto
    //             })
    //             .then(() => {
    //                 this.notificar(TipoNotificacao.ATENCAO,"Pronto","Tarefa sem projeto adicionada!")
    //             })
    //             .catch(() => {
    //                 this.notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos adicionar a tarefa!")
    //             })
    //         }else{
    //             this.store.dispatch(CADASTRAR_TAREFA, {
    //                 descricao: this.descricao,
    //                 duracaoEmSegundos: tempoDecorrido,
    //                 projeto: projeto
    //             })
    //             .then(() => {
    //                 this.notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa completa adicionada!")
    //             })
    //             .catch(() => {
    //                 this.notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos adicionar a tarefa!")
    //             })
                
    //         }

    //         this.$router.push('/')
    //     },

    //     atualizar (){
    //         const tarefa = this.store.state.tarefa.tarefas.find(trf => trf.id == this.id)
    //         let projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.idProjeto)
    //         if(tarefa != undefined){
    //             tarefa.descricao = this.descricao
    //             tarefa.projeto = projeto
    //             if(projeto == undefined){
    //                 this.store.dispatch(ALTERAR_TAREFA, tarefa)
    //                     .then(() => {
    //                         this.notificar(TipoNotificacao.ATENCAO,"Pronto","Tarefa atualizada sem projeto!")
    //                     })
    //                     .catch(() => {
    //                         this.notificar(TipoNotificacao.FALHA,"Ops","Houve algum problema com a API!")
    //                     })
    //             } else {
    //                 this.store.dispatch(ALTERAR_TAREFA, tarefa)
    //                     .then(() => {
    //                         this.notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa atualizada com sucesso!")
    //                     })
    //                     .catch(() => {
    //                         this.notificar(TipoNotificacao.FALHA,"Ops","Houve algum problema com a API!")
    //                     })
    //             }
    //         }
    //         this.$router.push('/')
    //     }
    // },
    setup( props ) {

        const router = useRouter()
        const descricao = ref("")
        const idProjeto = ref("")
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        const { notificar } = useNotificador()

        if(props.id){
            const tarefa = store.state.tarefa.tarefas.find(trf => trf.id == props.id)
            if(tarefa != undefined){
                descricao.value = tarefa.descricao
                idProjeto.value = tarefa.projeto? tarefa.projeto.id : ''
            }
        }

        const finalizarTarefa = (tempoDecorrido: number) => {
            let projeto = store.state.projeto.projetos.find(proj => proj.id == idProjeto.value)
            if(projeto == undefined){
                store.dispatch(CADASTRAR_TAREFA, {
                    descricao: descricao.value,
                    duracaoEmSegundos: tempoDecorrido,
                    projeto: projeto
                })
                .then(() => {
                    notificar(TipoNotificacao.ATENCAO,"Pronto","Tarefa sem projeto adicionada!")
                })
                .catch(() => {
                    notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos adicionar a tarefa!")
                })
            }else{
                store.dispatch(CADASTRAR_TAREFA, {
                    descricao: descricao.value,
                    duracaoEmSegundos: tempoDecorrido,
                    projeto: projeto
                })
                .then(() => {
                    notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa completa adicionada!")
                })
                .catch(() => {
                    notificar(TipoNotificacao.FALHA,"Ops","Não conseguimos adicionar a tarefa!")
                })
                
            }

            router.push('/')
        }

        const atualizar = () => {
            const tarefa = store.state.tarefa.tarefas.find(trf => trf.id == props.id)
            let projeto = store.state.projeto.projetos.find(proj => proj.id == idProjeto.value)
            if(tarefa != undefined){
                tarefa.descricao = descricao.value
                tarefa.projeto = projeto
                if(projeto == undefined){
                    store.dispatch(ALTERAR_TAREFA, tarefa)
                        .then(() => {
                            notificar(TipoNotificacao.ATENCAO,"Pronto","Tarefa atualizada sem projeto!")
                        })
                        .catch(() => {
                            notificar(TipoNotificacao.FALHA,"Ops","Houve algum problema com a API!")
                        })
                } else {
                    store.dispatch(ALTERAR_TAREFA, tarefa)
                        .then(() => {
                            notificar(TipoNotificacao.SUCESSO,"Pronto","Tarefa atualizada com sucesso!")
                        })
                        .catch(() => {
                            notificar(TipoNotificacao.FALHA,"Ops","Houve algum problema com a API!")
                        })
                }
            }
            router.push('/')
        }

        return {
            projetos: computed(() => store.state.projeto.projetos),
            store,
            notificar,
            descricao,
            idProjeto,
            finalizarTarefa,
            atualizar
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