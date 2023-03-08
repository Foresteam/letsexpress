<template>
	<q-btn v-if="type == 'item'" class="q-ma-none bg-bg" style="width: 100%;">
		<div class="column">
			<q-item-label>
				{{ ivgroup.title }}
			</q-item-label>
			<q-item-label caption style="color: rgba(255, 255, 255, .8)">
				{{ ivgroup.vDate }}
			</q-item-label>
		</div>
	</q-btn>
	<q-card flat class="bg-bg" v-else>
		<template v-if="type == 'simple'">
			<q-expansion-item switch-toggle-side expand-separator class="expansion">
				<template #header>
					<div class="row justify-between no-wrap" style="width: 100%">
						<div class="column q-pa-none q-my-auto q-mx-none">
							<q-item-label>{{ shortenedTitle }}</q-item-label>
							<q-item-label caption>{{ group.vDate }}</q-item-label>
						</div>
						<div>
							<delete-button @click="store.removeGroup(ivgroup.id)" />
						</div>
					</div>
				</template>
				<to-do v-for="todo of ivgroup.items" :key="`sgtodo${todo.id}`" :ivtodo="todo" simplified />
			</q-expansion-item>
		</template>
		<template v-if="type == 'unfolded'">
			<q-slide-item
				class="bg-accent"
				right-color="deep-orange"
				left-color="primary"
				@right="swipe(undefined, drop)"
				@left="details => swipe(details, edit)"
			>
				<template #left>
					<q-icon name="edit" />
				</template>
				<template #right>
					<q-icon name="delete" />
				</template>

				<div class="q-pl-sm">
					<div class="text-h6">
						{{ group.title }}
					</div>
					<div class="text-subtitle">
						{{ group.vDate }}
					</div>
				</div>
			</q-slide-item>
			<to-do v-for="todo of ivgroup.items" :key="`sgtodo${todo.id}`" :ivtodo="todo" />
		</template>
	</q-card>
</template>

<script lang="ts" setup>
import { useTodoStore, type IVTodoTimedGroup } from 'src/stores/todoStore';
import { computed } from 'vue';
import ToDo from 'src/components/ToDo.vue';
import DeleteButton from 'src/components/DeleteButton.vue';

const props = defineProps<{
	type: 'unfolded' | 'simple' | 'item';
	ivgroup: IVTodoTimedGroup;
}>();

const store = useTodoStore();
const group = computed({
	get: () => props.ivgroup,
	set: value => value && store.updateTodoGroup(props.ivgroup.id, value)
});

const shortenedTitle = computed(() => group.value.title.substring(0, 20));

const swipe = ({ reset }: { reset?: () => void } = { reset: undefined  }, action: () => unknown) => {
	setTimeout(reset ?? action, 100);
	reset && action();
};
const drop = () => store.removeGroup(props.ivgroup.id);
const edit = () => undefined;
</script>