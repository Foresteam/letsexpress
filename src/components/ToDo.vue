<template>
	<q-card>
		<template v-if="simplified">
			<q-checkbox v-model="completed" style="width: 100%">
				{{ ivtodo.content }}
				<q-item-label caption style="color: rgba(255, 255, 255, .8)">{{ ivtodo.vDateShort }}</q-item-label>
			</q-checkbox>
		</template>
		<template v-else>
			<q-checkbox v-model="completed">
				{{ shortenedTask }}
				<q-item-label caption style="color: rgba(255, 255, 255, .8)">{{ ivtodo.vDate }}</q-item-label>
			</q-checkbox>
			<div v-if="ivtodo.details" class="text-subtitle">
				{{ ivtodo.details }}
			</div>
		</template>
	</q-card>
</template>

<script lang="ts" setup>
import { useTodoStore, type IVTodo } from 'src/stores/todoStore';
import { computed } from 'vue';

const props = defineProps<{
	simplified?: boolean;
	ivtodo: IVTodo;
}>();

const store = useTodoStore();

const completed = computed({
	get: () => props.ivtodo.completed,
	set: value => {
		store.updateTodo(props.ivtodo.id, { completed: value });
		console.log(value);
	}
});
const shortenedTask = computed(() => props.ivtodo.content.substring(0, 20));
</script>