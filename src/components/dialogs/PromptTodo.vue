<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
			<q-card-section>
				<div class="text-h6">Add todo</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<q-input
					:dense="$q.platform.is.capacitor"
					outlined
					v-model="task"
					label="Task"
					type="textarea"
					:error="validation.form.task.isError()"
					error-message="Required"
					@update:model-value="validation.form.task.unlocked.value = true"
				/>
				<q-input :dense="$q.platform.is.capacitor" outlined v-model="details" label="Details" type="textarea" class="q-mt-sm" />

				<q-btn-dropdown :dense="$q.platform.is.capacitor" color="primary" class="q-mt-sm" style="width: 100%" auto-close>
					<template #label>
						<to-do-group v-if="group" :ivgroup="group" type="item" />
						<div v-else style="width: 100%">
							No group
						</div>
					</template>

					<q-list :dense="!$q.platform.is.capacitor">
						<q-item>
							<q-input dense v-model="filterGroups" label="Search" style="width: 100%" />
						</q-item>
						<q-item>
							<q-btn @click="_group = undefined" class="q-ma-none bg-bg" style="width: 100%">
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

				<q-btn-group spread class="q-mt-sm">
					<q-input :dense="!$q.platform.is.capacitor" outlined readonly :model-value="sDate" label="Deadline" class="col-10" />
					<q-btn-dropdown :dense="!$q.platform.is.capacitor" color="primary">
						<q-date v-model="_sDate" class="q-mx-auto" style="display: block;" />
					</q-btn-dropdown>
				</q-btn-group>
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
import useValidation from 'src/components/useValidation';

export interface Payload extends ITodo {
	group?: number;
};

const $q = useQuasar();
const store = useTodoStore();

const task = ref('');
const details = ref('');
const _sDate = ref('');
const _group = ref<number>();

const validation = useValidation({
	task: () => task.value.length > 0
});

const sDate = computed(() => {
	if (_sDate.value)
		return _sDate.value;
	if (_group.value !== undefined)
		return 'Group';
	return 'No specific';
});

const group = computed(() => _group.value !== undefined ? store.vTodosGroups[_group.value] : undefined);
const filterGroups = ref('');
const filteredGroups = computed(() => store.vTodosGroups.filter(g => g.title.indexOf(filterGroups.value) >= 0 || g.vDate.indexOf(filterGroups.value) >= 0));

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const onOKClick = () => {
	if (!validation.validateAll())
		return;
	(onDialogOK as (payload: Payload) => void)({
		completed: false,
		content: task.value,
		details: details.value,
		dateFulfill: _sDate.value || undefined,
		group: _group.value
	});
};
</script>