export interface Task {
	id?: Number;
	time: string;
	content: string;
	dayId?: Number;
	isPassed?: boolean;
}

export interface Day {
	id: number;
	name: string;
	shortName: string;
}
