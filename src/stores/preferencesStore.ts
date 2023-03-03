import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

const $id = 'preferences';
export const usePreferencesStore = defineStore($id, () => {
	const state = ref({
		showDone: false,
		showExpired: true
	});

	const saveState = () => LocalStorage.set($id, JSON.stringify(state));
	const loadState = () => Object.assign(state, JSON.parse(LocalStorage.getItem($id) || '{}'));

	watch(state, saveState);

	return { state, saveState, loadState };
});