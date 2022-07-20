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
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Tarefa from '../../components/Tarefa.vue';
import ITarefa from '../../interfaces/ITarefa';
import Box from '../../components/Box.vue';
import { useStore } from '@/store';


export default defineComponent({
    name: "Lista-Tarefas",
    components: {  Tarefa, Box },
    setup () {
        const store = useStore()
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    },

});

</script>
