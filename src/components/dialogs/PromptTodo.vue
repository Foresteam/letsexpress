<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
			<q-card-section>
				<div class="text-h6">Add todo</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<q-input :dense="$q.platform.is.capacitor" outlined v-model="title" label="Task" type="textarea" />

				<q-btn-group spread class="q-mt-sm">
					<q-input :dense="$q.platform.is.capacitor" outlined v-model="sDate" placeholder="No specific" class="col-10" />
					<q-btn-dropdown :dense="$q.platform.is.capacitor" color="primary">
						<q-date v-model="sDate" class="q-mx-auto" style="display: block;" />
					</q-btn-dropdown>
				</q-btn-group>
				
				<q-btn-dropdown :dense="$q.platform.is.capacitor" class="q-mt-sm" style="width: 100%">
					<template #label>
						dgfgdfg
					</template>

					<q-input dense v-model="filterGroups" />
					<q-list>
						<q-item>
							Some group
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
import { type ITodoTimedGroup, type ITodo } from '../models';
import { useQuasar } from 'quasar';
import { useTodoStore } from 'src/stores/todoStore';

export interface Payload extends ITodo {
	group?: ITodoTimedGroup;
};

const $q = useQuasar();
const store = useTodoStore();

const task = ref('');
const title = ref('');

const _sDate = ref('');
const sDate = computed({
	get: () => _sDate.value || '____/__/__',
	set: value => _sDate.value = value
});

const _group = ref<number>();
const group = computed(() => _group.value ? store.todoGroups[_group.value] : undefined);
const filterGroups = ref('');

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
	group: group.value
});
</script>