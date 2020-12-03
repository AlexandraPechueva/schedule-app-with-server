export interface Task {
	id: Number;
	time: string;
	content: string;

}

export interface Day {
	id: number;
	name: string;
}

export interface WeekTasks {
	day: Day;
	tasks: Task[];
}