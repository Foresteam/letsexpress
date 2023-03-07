<template>
  <q-page class="column items-center q-px-sm q-pt-sm">
			<div class="row wrap">
				<q-checkbox v-model="prefs.showDone" label="Show done" />
				<q-checkbox v-model="prefs.showExpired" label="Show expired" />
			</div>
			<to-do v-for="todo of todos" :key="`todof#${todo.id}`" :ivtodo="todo" class="q-mb-sm" style="width: 100%" />
		<q-btn round color="positive" icon="add" @click="addTodoMenu" size="1.5rem" class="add-todo" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { useTodoStore, isExpired } from 'src/stores/todoStore';
import { usePreferencesStore } from 'src/stores/preferencesStore';
import { useTodoPopup } from 'src/components/dialogs/popups';
import ToDo from 'src/components/ToDo.vue';

const $q = useQuasar();
const store = useTodoStore();
const prefs = usePreferencesStore().state;

const addTodoMenu = useTodoPopup($q, store);

const todos = computed(() => store.vTodos.filter(t => (!t.deadline || !isExpired(t.deadline) || prefs.showExpired) && (!t.completed || prefs.showDone)));
</script>

<style lang="scss" scoped>
.add-todo {
	position: fixed;
	z-index: 1;
	bottom: 36px;
	right: 20px;
}
</style>