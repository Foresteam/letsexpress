<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
			<q-card-section>
				<div class="text-h6">Add timed todo group</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<q-input outlined v-model="title" label="Group title" />
				<q-btn-group spread class="q-mt-sm">
					<q-input outlined v-model="sDateRange" class="col-10" />
					<q-btn-dropdown color="primary">
						<q-date v-model="dateRange" range class="q-mx-auto" style="display: block;" />
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
import { ref, computed, onMounted } from 'vue';
import { dateToString } from '../models';

export interface Payload {
	title: string;
	dateRange: {
		from: string;
		to: string;
	};
};

const props = defineProps<{ dateBegin?: Date }>();

const dateRange = ref<Payload['dateRange'] | string>({ from: '', to: '' });
const sDateRange = computed(() => typeof(dateRange.value) == 'object' ?
	`${dateRange.value.from || '____/__/__'} - ${dateRange.value.to || 'current'}` :
	`${dateRange.value || '____/__/__'} - current`
);
const title = ref('');

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const onOKClick = () => onDialogOK({
	title: title.value,
	dateRange: {
		from: (dateRange.value as Payload['dateRange']).from ?? dateRange.value as string,
		to: (dateRange.value as Payload['dateRange']).to || 'current'
	}
} as Payload);

onMounted(() => props.dateBegin &&
	(dateRange.value = dateToString(props.dateBegin))
);
</script>