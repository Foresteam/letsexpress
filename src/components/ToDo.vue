<template>
	<q-card v-if="simplified" class="todo bg-bg" flat :class="{ done: ivtodo.completed }">
		<q-checkbox v-model="completed" style="width: 100%">
			{{ ivtodo.content }}
			<q-item-label caption style="color: rgba(255, 255, 255, .8)">{{ ivtodo.vDateShort }}</q-item-label>
		</q-checkbox>
	</q-card>
	<q-slide-item 
		v-else
		right-color="deep-orange"
		left-color="primary"
		@right="swipe(undefined, drop)"
		@left="details => swipe(details, editPopup)"
	>
		<template #left>
			<q-icon name="edit" />
		</template>
		<template #right>
			<q-icon name="delete" />
		</template>

		<q-card class="todo bg-bg" flat :class="{ done: ivtodo.completed }">
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
		</q-card>
	</q-slide-item>
</template>

<script lang="ts" setup>
import { useTodoStore, type IVTodo } from 'src/stores/todoStore';
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import DeleteButton from 'src/components/DeleteButton.vue';
import { useTodoPopup } from './dialogs/popups';

const props = defineProps<{
	simplified?: boolean;
	ivtodo: IVTodo;
}>();

const store = useTodoStore();
const $q = useQuasar();

const editPopup = useTodoPopup($q, store, props.ivtodo);

const completed = computed({
	get: () => props.ivtodo.completed,
	set: value => store.updateTodo(props.ivtodo.id, { completed: value })
});
const shortenedTask = computed(() => props.ivtodo.content.substring(0, 20));

const swipe = ({ reset }: { reset?: () => void } = { reset: undefined  }, action: () => unknown) => {
	setTimeout(reset ?? action, 100);
	reset && action();
};

const drop = () => store.removeTodo(props.ivtodo.id);
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