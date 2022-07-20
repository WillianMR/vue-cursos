import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Tarefas from "../views/Tarefas.vue"
import Projetos from "../views/Projetos.vue"
import Lista from "../views/Projetos/Lista.vue"
import Formulario from "../views/Projetos/Formulario.vue"
import FormularioTarefa from "../views/Tarefas/Formulario.vue"
import ListaTarefa from "../views/Tarefas/Lista.vue"

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        component: Tarefas,
        children: [
            {
                path: '',
                name: 'Tarefas',
                component: ListaTarefa
            },
            {
                path: 'nova',
                name: 'Nova Tarefa',
                component: FormularioTarefa
            },
            {
                path: ':id',
                name: 'Atualizar Tarefa',
                component: FormularioTarefa,
                props: true
            },
        ]
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo Projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar Projeto',
                component: Formulario,
                props: true
            },
        ]
    },

]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;