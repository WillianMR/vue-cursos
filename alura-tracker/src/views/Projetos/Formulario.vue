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
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { ADICIONA_PROJETO } from '@/store/tipo-mutacoes';
import { ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';


export default defineComponent({
    name: "Formulario-Projetos",
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificacaoMixin],
    mounted (){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ' '
        }
    },
    data () {
        return {
            nomeDoProjeto: "",
        };
    },
    methods: {
        salvar () {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO,"Pronto","Projeto adicionado com sucesso!")
            this.$router.push('/projetos')
        },
        
    },
    setup () {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

