<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
    >
      <q-list>
				<q-expansion-item
					v-for="(group, i) of store.todoGroups"
					:key="'todog#' + i"
					switch-toggle-side
					expand-separator
					icon="perm_identity"
					:label="`${group.start} - ${group.end}`"
				>
					<q-card v-for="todo of store.groupsTodos[i]" :key="todo.content + todo.date">
						{{ todo.content }}
					</q-card>
				</q-expansion-item>
      </q-list>
			<q-btn color="primary" @click="addTodoGroupMenu">
				<q-icon center size="2em" name="add" />
			</q-btn>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useTodoStore } from 'src/stores/todoStore';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import PromptTodoGroup, { type Payload as TodoGroupCreation } from 'src/components/Dialogs/PromptTodoGroup.vue';

const $q = useQuasar();
const store = useTodoStore();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;

const addTodoGroupMenu = () => $q.dialog({
	component: PromptTodoGroup
}).onOk((payload: TodoGroupCreation) => {
	console.log(payload);
});
</script>

<style lang="scss" scoped>
::v-deep(.drawer) {
	padding: 2px 4px;
	>button {
		width: 100%;
		display: block;
		margin: auto;
	}
}
</style>