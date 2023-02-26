<template>
	<q-card>
		<template v-if="simplified">
			<q-checkbox v-model="completed" />
			<q-item>
				<q-item-label>
					{{ shortenedTask }}
				</q-item-label>
				<q-item-label caption>{{ ivtodo.dateFulfill || 'No specific date' }}</q-item-label>
			</q-item>
		</template>
		<template v-else>
			<q-checkbox v-model="completed" :label="ivtodo.content" style="width: 100%" />
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