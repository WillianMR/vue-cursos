import clienteHttp from "@/http"
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipo-acoes"
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ATUALIZA_TAREFA, REMOVE_TAREFA } from "@/store/tipo-mutacoes"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, dadosTarefa:ITarefa) {
            state.tarefas.push(dadosTarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(trf => trf.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [REMOVE_TAREFA](state, id:string) {
            state.tarefas = state.tarefas.filter(trf => trf.id != id)
        },
    },
    actions: {
        [OBTER_TAREFAS]({commit}, filtro?:string){
            let url = 'tarefas'
            if(filtro){
                url += '?descricao=' + filtro
            }
            clienteHttp.get(url)
            .then(resposta => commit(DEFINIR_TAREFAS,resposta.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa:ITarefa){
            return clienteHttp.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
        },
        [ALTERAR_TAREFA]({commit}, tarefa:ITarefa){
            return clienteHttp.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => commit(ATUALIZA_TAREFA,resposta.data))
        },
        [REMOVER_TAREFA]({commit}, id:string){
            return clienteHttp.delete(`/tarefas/${id}`)
            .then(() => commit(REMOVE_TAREFA,id))
        },
    }

}
