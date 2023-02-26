<template>
  <q-page class="column items-center q-px-sm q-pt-sm" style="display: flex; flex-direction: column;">
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
			<to-do-group v-for="group of store.vTodosGroups" :key="`tgroupg#${group.id}`" :ivgroup="group" type="unfolded" class="q-mb-sm" style="width: 100%" />
		<q-btn round color="positive" icon="add" @click="addTodoGroupMenu" size="1.5rem" class="add-group" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTodoStore } from 'src/stores/todoStore';
import PromptTodoGroup, { type Payload as TodoGroupCreation } from 'src/components/dialogs/PromptTodoGroup.vue';
import ToDoGroup from 'src/components/ToDoGroup.vue';

const $q = useQuasar();
const store = useTodoStore();

const addTodoGroupMenu = () => $q.dialog({
	component: PromptTodoGroup
}).onOk((payload: TodoGroupCreation) => store.addTodoTimedGroup({
	start: payload.dateRange.from,
	end: payload.dateRange.to,
	itemIDs: [],
	title: payload.title
}, payload.endPrevious));
</script>

<style lang="scss" scoped>
.add-group {
	position: fixed;
	z-index: 1;
	bottom: 36px;
	right: 20px;
}
</style>