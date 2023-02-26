import { defineStore } from 'pinia';
import { type ITodo, type ITodoTimedGroup, findTodos } from 'src/components/models';

export const useTodoStore = defineStore('counter', {
	state: () => ({
		todos: {} as { [key: number]: ITodo | undefined },
		todoGroups: [] as ITodoTimedGroup[]
	}),
	getters: { 
		groupsTodos: state => state.todoGroups.map(g => findTodos(state.todos, g.itemIDs))
	},
	actions: {
		addTodo(todo: ITodo) {
			const id = parseInt(Object.entries(this.todos).at(-1)?.at(0) as (string | undefined) ?? '-1') + 1;
			this.todos[id] = todo;
		},
		addTodoTimedGroup(group: ITodoTimedGroup, endPrevious = true) {
			const last = this.todoGroups.at(-1);
			if (endPrevious && last && last.end == 'current')
				last.end = undefined;
			this.todoGroups.push(group);
		}
	},
});
