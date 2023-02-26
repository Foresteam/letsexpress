<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
			<q-card-section>
				<div class="text-h6">Add timed todo group</div>
			</q-card-section>
			<q-card-section class="q-pt-none">
				<q-input
					:dense="!$q.platform.is.capacitor"
					outlined
					v-model="title"
					label="Group title"
					:error="errors.title.isError()"
					@update:model-value="errors.title.unlocked.value = true"
					error-message="Required"
				/>
				<q-btn-group spread class="q-mt-sm" unelevated flat>
					<q-input
						dense
						outlined
						readonly
						v-model="sDateRange"
						:label="typeof dateRange == 'object' ? 'Date range' : 'Deadline date'"
						:error="errors.dateRange.isError()"
						error-message="Required"
						class="col-10"
					/>
					<q-btn-dropdown dense color="primary" @click="errors.dateRange.unlocked.value = true">
						<q-date v-model="dateRange" range class="q-mx-auto" style="display: block;" />
					</q-btn-dropdown>
				</q-btn-group>
				<q-checkbox v-model="endPrevious" label="End previous group on this date" class="q-mt-sm" />
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
import { useQuasar } from 'quasar';
import useValidation from 'src/components/useValidation';

export interface Payload {
	title: string;
	endPrevious: boolean;
	dateRange: {
		from: string;
		to?: string;
	};
};

const $q = useQuasar();

const props = defineProps<{ dateBegin?: Date }>();

const dateRange = ref<Payload['dateRange'] | string>({ from: '', to: '' });
const title = ref('');

const errors = useValidation({
	title: {
		validate: () => title.value.length > 0
	},
	dateRange: {
		validate: () => typeof dateRange.value == 'object' ? !!dateRange.value.from : dateRange.value.length > 0
	}
});

const endPrevious = ref(true);
const sDateRange = computed(() => typeof(dateRange.value) == 'object' ?
	`${dateRange.value.from || '____/__/__'} - ${dateRange.value.to || '____/__/__'}` :
	`${dateRange.value || '____/__/__'}`
);

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const onOKClick = () => {
	if (!errors.validateAll())
		return;
	onDialogOK({
		title: title.value,
		endPrevious: endPrevious.value,
		dateRange: {
			from: (dateRange.value as Payload['dateRange']).from ?? dateRange.value as string,
			to: (dateRange.value as Payload['dateRange']).to || undefined
		}
	} as Payload);
};

onMounted(() => props.dateBegin &&
	(dateRange.value = dateToString(props.dateBegin))
);
</script>