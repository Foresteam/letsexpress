import { defineStore } from 'pinia';
import { type ITodo, type ITodoTimedGroup } from 'src/components/models';

export interface IVTodo extends ITodo {
	vDate: string;
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

export const useTodoStore = defineStore('counter', {
	state: () => ({
		todos: {} as { [key: number]: ITodo | undefined },
		todoGroups: [] as ITodoTimedGroup[]
	}),
	getters: {
		vTodosGroups(): IVTodoTimedGroup[] {
			return this.todoGroups.map(
				(g, i) => Object.assign({}, g, <Partial<IVTodoTimedGroup>>{
					vDate: g.end ? `${g.start} - ${g.end}` : g.start,
					items: this.vTodos.filter(t => g.itemIDs.includes(t.id)),
					id: i
				})
			) as IVTodoTimedGroup[];
		},
		vTodos: state => {
			const todos = Object.entries(state.todos).map(([k, v]) => {
				const t: Partial<IVTodo> = {
					...v,
					id: parseInt(k)
				};
				return t;
			}) as IVTodo[];
			for (const iv of todos)
				Object.assign(iv, {
					vDate: iv.dateFulfill ?? 'No specific deadline'
				} as Partial<IVTodo>);
			return todos;
		}
	},
	actions: {
		addTodo(todo: ITodo) {
			const id = parseInt(Object.entries(this.todos).at(-1)?.at(0) as (string | undefined) ?? '-1') + 1;
			this.todos[id] = todo;
			return id;
		},
		groupTodo(group: number, todo: number) { 
			this.todoGroups[group].itemIDs.push(todo);
		},
		updateTodo(id: number, value: Partial<ITodo>) {
			if (!Object.keys(this.todos).includes(id + ''))
				return;
			const todo = this.todos[id] as ITodo;
			value = verifiedKeys(todo, value);
			Object.assign(todo, value);
		},
		updateTodoGroup(id: number, value: ITodoTimedGroup) {
			if (!this.todoGroups[id])
				return;
			const group = this.todoGroups[id] as ITodoTimedGroup;
			value = verifiedKeys(group, value);
			Object.assign(group, value);
		},
		addTodoTimedGroup(group: ITodoTimedGroup, endPrevious = true) {
			const last = this.todoGroups.at(-1);
			if (endPrevious && last && last.end == 'current')
				last.end = undefined;
			this.todoGroups.push(group);
		}
	},
});
