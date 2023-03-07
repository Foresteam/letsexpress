import { type QVueGlobals } from 'quasar/dist/types/globals';
import PromptTodo, { type Payload as TodoCreation } from 'src/components/dialogs/PromptTodo.vue';
import PromptTodoGroup, { type Payload as TodoGroupCreation } from 'src/components/dialogs/PromptTodoGroup.vue';
import { IVTodo } from 'src/stores/todoStore';
import { ITodo, ITodoTimedGroup } from '../models';

export interface IRequiredActions {
	addTodo: (todo: ITodo) => number;
	addTodoTimedGroup: (group: ITodoTimedGroup, endPrevious?: boolean) => void;
	updateTodo: (id: number, value: Partial<ITodo>) => void;
	groupTodo: (group: number, id: number) => void;
	ungroupTodo: (id: number) => void;
	getGroup: (todoID: number) => number | undefined
}

/** @returns openTodoPopup */
export const useTodoPopup = ($q: QVueGlobals, store: IRequiredActions, edit?: IVTodo) => () => $q.dialog({
	component: PromptTodo,
	componentProps: {
		edit: edit ? {
			...edit,
			group: store.getGroup(edit.id)
		} : undefined
	}
}).onOk((payload: TodoCreation) => {
	const group = payload.group;
	delete payload.group;
	let id: number;
	if (edit) {
		id = edit.id;
		store.updateTodo(id, payload);
	}
	else
		id = store.addTodo(payload);
	if (group === undefined)
		store.ungroupTodo(id);
	else
		store.groupTodo(group, id);
});

/** @returns openTodoGroupPopup */
export const useTodoGroupPopup = ($q: QVueGlobals, store: IRequiredActions) => () => $q.dialog({
	component: PromptTodoGroup
}).onOk((payload: TodoGroupCreation) => store.addTodoTimedGroup({
	start: payload.dateRange.from,
	end: payload.dateRange.to,
	itemIDs: [],
	title: payload.title
}, payload.endPrevious));