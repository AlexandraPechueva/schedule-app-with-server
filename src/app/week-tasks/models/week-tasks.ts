export interface Task {
	id?: Number;
	time: string;
	content: string;
	dayId?: Number;
}

export interface Day {
	id: number;
	name: string;
	shortName: string;
}
