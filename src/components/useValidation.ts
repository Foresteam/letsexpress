import { ref, type Ref } from 'vue';

export type ValidationInput = {
	[key: string]: () => boolean;
}
export interface ValidationThings {
	isError: () => boolean;
	unlocked: Ref<boolean>;
}
export type ValidationOutput<T extends ValidationInput> = {
	[key in keyof T]: { validate: T[key] } & ValidationThings;
}

/** @param data Validation functions */
export default function useValidation<T extends ValidationInput>(data: T) {
	const rs = Object.assign({}, data) as unknown as ValidationOutput<T>;
	for (const [k, validate] of Object.entries(data)) {
		const unlocked = ref(false);
		const payload: ValidationThings = {
			unlocked,
			isError: () => unlocked.value && !(validate())
		};
		rs[k as keyof T] = Object.assign(payload, { validate }) as ValidationOutput<T>[keyof T];
	}
	
	return {
		form: rs,
		validateAll: () => {
			Object.values(rs).forEach(v => {
				if (typeof v != 'object')
					return;
				(v as ValidationThings).unlocked.value = true;
			});
			return Object.values(rs).reduce((p, v) => {
				if (typeof v != 'object')
					return p;
				return (p + (!(v.validate?.() ?? false) ? 1 : 0));
			}, 0) == 0;
		}
	};
}