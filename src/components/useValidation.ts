import { ref, type Ref } from 'vue';

export type ValidationInput = {
	[key: string]: {
		validate?: () => boolean
	}
}
export interface ValidationThings {
	isError: () => boolean;
	unlocked: Ref<boolean>;
}
export type ValidationOutput<T extends ValidationInput> = {
	[key in keyof T]: T[key] & ValidationThings;
} & {
	validateAll: () => boolean;
}

export default function useValidation<T extends ValidationInput>(data: T) {
	const rs = Object.assign({}, data) as ValidationOutput<T>;
	for (const element of Object.values(rs as T)) {
		const unlocked = ref(false);
		const payload: ValidationThings = {
			unlocked,
			isError: () => unlocked.value && !(element.validate?.() ?? true)
		};
		Object.assign(element, payload);
	}
	rs.validateAll = () => {
		Object.values(rs).forEach(v => {
			if (typeof v != 'object')
				return;
			(v as ValidationThings).unlocked.value = true;
		});
		// use -1 for we have a function in additional to the objects
		return Object.values(rs as T).reduce((p, v) => (p + (!(v.validate?.() ?? false) ? 1 : 0)), -1) == 0;
	};
	return rs;
}