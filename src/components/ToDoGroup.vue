<template>
	<q-btn v-if="type == 'item'" class="q-ma-none" style="width: 100%">
		<div class="col">
			<q-item-label>
				{{ ivgroup.title }}
			</q-item-label>
			<q-item-label caption style="color: rgba(255, 255, 255, .8)">
				{{ ivgroup.vDate }}
			</q-item-label>
		</div>
	</q-btn>
	<q-card v-else>
		<template v-if="type == 'simple'">
			<q-expansion-item :label="shortenedTitle" :caption="group.vDate" switch-toggle-side expand-separator>
				<to-do v-for="todo of ivgroup.items" :key="`sgtodo${todo.id}`" :ivtodo="todo" simplified />
			</q-expansion-item>
		</template>
		<template v-if="type == 'unfolded'">
			<div class="text-h6">
				{{ group.title }}
			</div>
			<div class="text-h6">
				{{ group.vDate }}
			</div>
		</template>
	</q-card>
</template>

<script lang="ts" setup>
import { useTodoStore, type IVTodoTimedGroup } from 'src/stores/todoStore';
import { computed } from 'vue';
import ToDo from 'src/components/ToDo.vue';

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
</script>