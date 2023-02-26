<template>
  <q-layout view="lHh Lpr lFf" style="height: 100%">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Let's Express
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
			class="drawer"
			style="display: flex; flex-direction: column;"
    >
			<div class="text-h6 text-center">Todos</div>
      <q-list style="flex-grow: 1">
				<to-do-group
					v-for="group of vTodosGroups"
					:key="'todog#' + group.id"
					:ivgroup="group"
					type="simple"
				/>

      </q-list>
			<q-btn color="positive" @click="addTodoGroupMenu">
				<q-icon center size="2em" name="add" />
			</q-btn>
    </q-drawer>

    <q-page-container>
			<q-tabs>
				<q-route-tab name="todos" to="/" label="Todos" />
				<q-route-tab name="groups" to="/groups" label="Groups" />
			</q-tabs>
			<router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useTodoStore } from 'src/stores/todoStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import PromptTodoGroup, { type Payload as TodoGroupCreation } from 'src/components/dialogs/PromptTodoGroup.vue';
import ToDoGroup from 'src/components/ToDoGroup.vue';

const $q = useQuasar();
const store = useTodoStore();
const { vTodosGroups } = storeToRefs(store);

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;

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
::v-deep(.drawer) {
	display: flex;
	flex-flow: column;
	align-items: center;
	gap: 4px;
	padding: 2px 4px;
	>* {
		width: 100%;
		display: block;
	}
}
hr {
	width: 100%;
}
</style>