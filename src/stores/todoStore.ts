import { defineStore } from 'pinia';
import { dateFromString, dateToString, type ITodo, type ITodoTimedGroup } from 'src/components/models';
import { LocalStorage } from 'quasar';

export interface IVTodo extends ITodo {
	vDate: string;
	vDateShort: string;
	deadline: string;
	id: number;
}
export interface IVTodoTimedGroup extends ITodoTimedGroup {
	id: number;
	vDate: string;
	items: IVTodo[];
}

const verifiedKeys = <T extends object>(reference: T, value: T): T => {
	value = Object.assign({}, value);
	for (const k in value)
		if (!Object.keys(reference).includes(k))
			delete (value as unknown as { [key: string]: unknown })[k];
	return value;
};

export const dayExpirationDelta = (sdate: string) => {
	const todayDate = new Date();
	const d = Math.floor((dateFromString(sdate).getTime() - todayDate.getTime()) / 1000 / 60 / 60 / 24);
	return { d, todayDate };
};
export const isExpired = (sdate: string) => dayExpirationDelta(sdate).d < 0;
const deadlineString = (sdate: string, brackets = true) => {
	const { d, todayDate } = dayExpirationDelta(sdate);
	const today = dateToString(todayDate);
	if (isExpired(sdate))
		return '😅';
	const brace = (t: string) => brackets ? `(${t})` : t;
	if (d == 0 && today == sdate)
		return brace('today is the day');
	return brace(`${d > 0 ? d : '<1'} days left${d > 0 ? '' : '!'}`);
};

export const useTodoStore = defineStore('todos', {
	state: () => ({
		todos: {} as { [key: number]: ITodo | undefined },
		todoGroups: [] as ITodoTimedGroup[]
	}),
	getters: {
		vGrouppedTodos: state => ([] as unknown[]).concat(...state.todoGroups.map(g => g.itemIDs)),
		vTodos() {
			const todos = Object.entries(this.todos).map(([k, v]) => {
				const t: Partial<IVTodo> = {
					...v,
					id: parseInt(k)
				};
				return t;
			}) as IVTodo[];

			const getDeadline = (iv: IVTodo) => {
				if (iv.dateFulfill)
					return iv.dateFulfill;
				if (!this.vGrouppedTodos.includes(iv.id))
					return undefined;
				const group = this.todoGroups.find(g => g.itemIDs.includes(iv.id)) as ITodoTimedGroup;
				return group.end ?? group.start;
			};
			const vDate = (iv: IVTodo) => {
				const deadline = getDeadline(iv);
				if (deadline)
					return `${iv.dateFulfill ? '' : 'Group deadline: '}${deadline} ${deadlineString(deadline, true)}`;
				return 'No specific deadline';
			};

			for (const iv of todos) {
				const deadline = getDeadline(iv);
				Object.assign(iv, {
					vDate: vDate(iv),
					vDateShort: deadline ? deadlineString(deadline, !!iv.dateFulfill) : undefined,
					deadline
				} as Partial<IVTodo>);
			}
			return todos.sort((a, b) => dateFromString(getDeadline(a) ?? dateToString(new Date())).getTime() - dateFromString(getDeadline(b) ?? dateToString(new Date(0))).getTime());
		},
		vTodosGroups(): IVTodoTimedGroup[] {
			return (this.todoGroups.map(
				(g, i) => Object.assign({}, g, <Partial<IVTodoTimedGroup>>{
					vDate: (g.end ? `${g.start} - ${g.end}` : g.start) + ' ' + deadlineString(g.end ?? g.start),
					items: this.vTodos.filter(t => g.itemIDs.includes(t.id)),
					id: i
				})
			) as IVTodoTimedGroup[])
				.sort((a, b) => dateFromString(a.end ?? a.start).getTime() - dateFromString(b.end ?? b.start).getTime());
		},
	},
	actions: {
		async saveState() {
			LocalStorage.set(this.$id, JSON.stringify(this.$state));
		},
		async loadState() {
			Object.assign(this.$state, JSON.parse(LocalStorage.getItem(this.$id) || '{}'));
		},
		addTodo(todo: ITodo) {
			const id = parseInt(Object.entries(this.todos).at(-1)?.at(0) as (string | undefined) ?? '-1') + 1;
			this.todos[id] = todo;
			this.saveState();
			return id;
		},
		removeTodo(id: number) {
			delete this.todos[id];
			this.saveState();
		},
		removeGroup(id: number) {
			this.todoGroups.splice(id, 1);
			this.saveState();
		},
		groupTodo(group: number, todo: number) { 
			this.todoGroups[group].itemIDs.push(todo);
			this.saveState();
		},
		ungroupTodo(id: number) {
			let save = false;
			for (const group of this.todoGroups)
				if (group.itemIDs.includes(id)) {
					group.itemIDs.splice(group.itemIDs.indexOf(id), 1);
					save = true;
				}
			save && this.saveState();
		},
		getGroup(todoID: number): number | undefined {
			for (const [id, group] of Object.entries(this.todoGroups))
				if (group.itemIDs.includes(todoID))
					return +id;
			return undefined;
		},
		updateTodo(id: number, value: Partial<ITodo>) {
			if (!Object.keys(this.todos).includes(id + ''))
				return;
			const todo = this.todos[id] as ITodo;
			value = verifiedKeys(todo, value);
			Object.assign(todo, value);
			this.saveState();
		},
		updateTodoGroup(id: number, value: ITodoTimedGroup) {
			if (!this.todoGroups[id])
				return;
			const group = this.todoGroups[id] as ITodoTimedGroup;
			value = verifiedKeys(group, value);
			Object.assign(group, value);
			this.saveState();
		},
		addTodoTimedGroup(group: ITodoTimedGroup, endPrevious = true) {
			const last = this.todoGroups.at(-1);
			if (endPrevious && last && last.end && group.start)
				last.end = group.start;
			this.todoGroups.push(group);
			this.saveState();
		}
	},
});
