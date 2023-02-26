<template>
  <q-page class="column items-center q-px-sm q-pt-sm" style="display: flex; flex-flow: column;">
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
			<to-do v-for="todo of store.vTodos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
		<q-btn round color="positive" icon="add" @click="addTodoMenu" size="1.5rem" class="add-todo" />
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

<style lang="scss" scoped>
.add-todo {
	position: fixed;
	z-index: 1;
	bottom: 36px;
	right: 20px;
}
</style>