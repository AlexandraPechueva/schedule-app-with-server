export interface Task {
	id: Number;
	time: string;
	content: string;

}

export interface Day {
	id: number;
	name: string;
	shortName: string;
}

export interface WeekTasks {
	day: Day;
	tasks: Task[];
}