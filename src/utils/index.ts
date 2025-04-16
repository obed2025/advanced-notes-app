import type { DateOptions } from './types';

export const getArray = (length: number): number[] => Array.from({ length }, () => length);

export function generateRandomId(): string {
	const now = Date.now();
	const randomNumber = Math.floor(Math.random() * 1e3);

	return `${now}-${randomNumber}`;
}

export const dateOptions: DateOptions = {
	day: 'numeric',
	year: 'numeric',
	month: 'long',
	weekday: 'long',
	hour12: false,
	minute: '2-digit',
	hour: '2-digit'
};

export const getDate = (id: string) => {
	const date = new Date(+id.split('-')[0]);

	return date.toLocaleString('en-uk', dateOptions);
};
