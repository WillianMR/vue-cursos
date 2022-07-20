import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ATUALIZA_TAREFA, EXCLUIR_PROJETO, REMOVE_TAREFA } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
}
export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id:string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [ADICIONA_TAREFA](state:any, dadosTarefa:ITarefa) {
            const tarefa = {
                id: new Date().toISOString(),
                descricao: dadosTarefa.descricao,
                duracaoEmSegundos: dadosTarefa.duracaoEmSegundos,
            } as ITarefa

            if(dadosTarefa.projeto){
                console.log('sim')
                tarefa.projeto = dadosTarefa.projeto
            }
           
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(trf => trf.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [REMOVE_TAREFA](state, id:string) {
            state.tarefas = state.tarefas.filter(trf => trf.id != id)
        },
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}