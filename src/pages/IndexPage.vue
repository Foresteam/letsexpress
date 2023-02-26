<template>
  <q-page class="row items-center justify-center">
		<div style="display: flex; flex-direction: column; gap: 10px; width: calc(100% - 10px * 2)">
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" />
			<q-btn @click="addTodoMenu" color="primary">
				<q-icon center size="2em" name="add" />
			</q-btn>
		</div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTodoStore } from 'src/stores/todoStore';
import PromptTodo, { type Payload as TodoCreation } from 'src/components/dialogs/PromptTodo.vue';
import ToDo from 'src/components/ToDo.vue';

const $q = useQuasar();
const store = useTodoStore();

const addTodoMenu = () => $q.dialog({
	component: PromptTodo
}).onOk((payload: TodoCreation) => {
	const group = payload.group;
	delete payload.group;
	const id = store.addTodo(payload);
	if (group !== undefined)
		store.groupTodo(group, id);
});
</script>
