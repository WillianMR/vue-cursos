<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
// import { notificacaoMixin } from '@/mixins/notificar';
import useNotificador from '@/hooks/notificador'
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: "Formulario-Projetos",
    props: {
        id: {
            type: String
        }
    },
    // mixins: [notificacaoMixin],
    // mounted (){
    //     if(this.id){
    //         const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
    //         this.nomeDoProjeto = projeto?.nome || ' '
    //     }
    // },
    // data () {
    //     return {
    //         nomeDoProjeto: "",
    //     };
    // },
    // methods: {
    //     salvar () {
    //         if (this.id) {
    //             this.store.dispatch(ALTERAR_PROJETO, {
    //                 id: this.id,
    //                 nome: this.nomeDoProjeto
    //             })
    //                 .then(() => {
    //                     this.notificar(TipoNotificacao.SUCESSO,"Pronto","Projeto atualizado com sucesso!")
    //                 })
    //                 .catch(() => {
    //                     this.notificar(TipoNotificacao.FALHA,"Ops","Aconteceu algum erro na API!")
    //                 })
    //         } else {
    //             this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
    //                 .then(() => {
    //                     this.notificar(TipoNotificacao.SUCESSO,"Pronto","Projeto adicionado com sucesso!")
    //                     this.nomeDoProjeto = ''
    //                 })
    //                 .catch(() => {
    //                     this.notificar(TipoNotificacao.FALHA,"Ops","Aconteceu algum problema!")
    //                 })
    //         }
    //         this.$router.push('/projetos')
    //     },
        
    // },
    setup (props) {
        const store = useStore()
        const { notificar } = useNotificador()
        const nomeDoProjeto = ref("")
        const router = useRouter()

        if (props.id){
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ' '
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                })
                    .then(() => {
                        notificar(TipoNotificacao.SUCESSO,"Pronto","Projeto atualizado com sucesso!")
                    })
                    .catch(() => {
                        notificar(TipoNotificacao.FALHA,"Ops","Aconteceu algum erro na API!")
                    })
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => {
                        notificar(TipoNotificacao.SUCESSO,"Pronto","Projeto adicionado com sucesso!")
                        nomeDoProjeto.value = ''
                    })
                    .catch(() => {
                        notificar(TipoNotificacao.FALHA,"Ops","Aconteceu algum problema!")
                    })
            }
            router.push('/projetos')
        }

        return {
            // store,
            // notificar,
            nomeDoProjeto,
            salvar
        }
    }
})
</script>

