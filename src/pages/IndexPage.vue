<template>
  <q-page class="row items-center justify-evenly">
		<q-btn @click="addTodoMenu">
			<q-icon center size="2em" name="add" />
		</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTodoStore } from 'src/stores/todoStore';
import PromptTodo, { type Payload as TodoCreation } from 'src/components/dialogs/PromptTodo.vue';

const $q = useQuasar();
const store = useTodoStore();

const addTodoMenu = () => $q.dialog({
	component: PromptTodo
}).onOk((payload: TodoCreation) => {
	store.addTodo(payload);
});
</script>
