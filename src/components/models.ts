export interface ITodo {
	content: string;
	details?: string;
	completed?: boolean;
	dateFulfill?: string;
};
export interface ITodoTimedGroup {
	title: string;
	start: string;
	end?: string;
	itemIDs: number[];
};

export const findTodos = <T extends ITodo>(where: T[], itemIDs: number[]) => itemIDs.map(id => where[id] as T);
export const dateToString = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
export const dateFromString = (s: string) => {
	const split = s.split('/').map(s => parseInt(s));
	return new Date(split[0], split[1] - 1, split[2]);
};