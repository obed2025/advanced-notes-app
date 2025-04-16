export interface Note {
	id: string;
	title: string;
	tags: string[];
	description: string;
	body: string;
	lastUpdate?: Date;
}

export interface DateOptions {
	day: 'numeric';
	year: 'numeric';
	month: 'long';
	weekday: 'long';
	hour12: false;
	minute: '2-digit';
	hour: '2-digit';
}
