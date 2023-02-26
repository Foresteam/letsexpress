<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
			<q-card-section>
				<div class="text-h6">Add todo</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<q-input :dense="$q.platform.is.capacitor" outlined v-model="task" label="Task" type="textarea" />

				<q-btn-group spread class="q-mt-sm">
					<q-input :dense="$q.platform.is.capacitor" outlined v-model="sDate" placeholder="No specific" class="col-10" />
					<q-btn-dropdown :dense="$q.platform.is.capacitor" color="primary">
						<q-date v-model="sDate" class="q-mx-auto" style="display: block;" />
					</q-btn-dropdown>
				</q-btn-group>
				
				<q-btn-dropdown :dense="$q.platform.is.capacitor" class="q-mt-sm" style="width: 100%">
					<template #label>
						<to-do-group v-if="group" :ivgroup="group" type="item" />
						<template v-else>
							No group
						</template>
					</template>

					<q-input dense v-model="filterGroups" label="Search" />
					<q-list>
						<q-item>
							<q-btn @click="_group = undefined" class="q-ma-none" style="width: 100%">
								<q-item-label>
									No group
								</q-item-label>
							</q-btn>
						</q-item>
						<q-item v-for="foundGroup in filteredGroups" :key="foundGroup.id">
							<to-do-group :ivgroup="foundGroup" type="item" @click="_group = foundGroup.id" />
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, computed } from 'vue';
import { type ITodo } from '../models';
import { useQuasar } from 'quasar';
import { useTodoStore } from 'src/stores/todoStore';
import ToDoGroup from '../ToDoGroup.vue';

export interface Payload extends ITodo {
	group?: number;
};

const $q = useQuasar();
const store = useTodoStore();

const task = ref('');

const _sDate = ref('');
const sDate = computed({
	get: () => _sDate.value || '____/__/__',
	set: value => _sDate.value = value
});

const _group = ref<number>();
const group = computed(() => _group.value !== undefined ? store.vTodosGroups[_group.value] : undefined);
const filterGroups = ref('');
const filteredGroups = computed(() => store.vTodosGroups.filter(g => g.title.indexOf(filterGroups.value) >= 0 || g.vDate.indexOf(filterGroups.value) >= 0));

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const onOKClick = () => (onDialogOK as (payload: Payload) => void)({
	completed: false,
	content: task.value,
	dateFulfill: sDate.value || undefined,
	group: _group.value
});
</script>