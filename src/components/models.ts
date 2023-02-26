export interface ITodo {
	content: string;
	completed?: boolean;
	dateFulfill?: string;
};
export interface ITodoTimedGroup {
	title: string;
	start: string;
	end?: string;
	itemIDs: number[];
};

export const findTodos = (where: { [key: number]: ITodo | undefined }, itemIDs: number[]) => itemIDs.map(id => where[id] as ITodo);
export const dateToString = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
export const dateFromString = (s: string) => {
	const split = s.split('/').map(s => parseInt(s));
	return new Date(split[0], split[1] - 1, split[2]);
};