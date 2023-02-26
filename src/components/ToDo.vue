<template>
	<q-card class="todo" :class="{ done: ivtodo.completed }">
		<template v-if="simplified">
			<q-checkbox v-model="completed" style="width: 100%">
				{{ ivtodo.content }}
				<q-item-label caption style="color: rgba(255, 255, 255, .8)">{{ ivtodo.vDateShort }}</q-item-label>
			</q-checkbox>
		</template>
		<template v-else>
			<div class="group">
				<q-checkbox v-model="completed">
					{{ shortenedTask }}
					<q-item-label caption style="color: rgba(255, 255, 255, .8)">{{ ivtodo.vDate }}</q-item-label>
				</q-checkbox>
				<delete-button @click="store.removeTodo(ivtodo.id)" />
			</div>
			<div v-if="ivtodo.details" class="text-subtitle details">
				{{ ivtodo.details }}
			</div>
		</template>
	</q-card>
</template>

<script lang="ts" setup>
import { useTodoStore, type IVTodo } from 'src/stores/todoStore';
import { computed } from 'vue';
import DeleteButton from 'src/components/DeleteButton.vue';

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

<style lang="scss" scoped>
@mixin inset {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
}
.group {
	display: flex;
	gap: 10px;
	>* {
		&:not(:first-child) {
			flex-shrink: 1;
		}
		&:first-child {
			flex-grow: 1;
		}
	}
	button {
		margin: 5px;
		margin-right: 0px;
	}
}
.todo {
	padding: 0px 5px 5px;
	&.done {
		position: relative;
		opacity: .5;
	}
}
.details {
	padding: 0px 10px;
}
</style>