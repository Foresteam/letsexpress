export interface ITodo {
	content: string;
	completed?: boolean;
	date?: Date;
};
export interface ITodoTimedGroup {
	title: string;
	start: Date;
	end: Date | 'current';
	itemIDs: number[];
};

export const findTodos = (where: { [key: number]: ITodo | undefined }, itemIDs: number[]) => itemIDs.map(id => where[id] as ITodo);
export const dateToString = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;