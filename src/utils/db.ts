import type { Note } from './types';

export default class DataBase {
	#name = 'Notes DB';
	#store = 'notes';
	#db = this.#openDb();

	#openDb(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.#name, 1);

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				db.createObjectStore(this.#store, { keyPath: 'id' });
			};

			request.onsuccess = (event) => {
				resolve((event.target as IDBOpenDBRequest).result);
			};

			request.onerror = (event) => {
				reject((event.target as IDBOpenDBRequest).error);
			};
		});
	}

	async addNote(note: Note): Promise<string> {
		const db = await this.#db;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([this.#store], 'readwrite');
			const objectStore = transaction.objectStore(this.#store);
			const request = objectStore.add(note);

			request.onsuccess = () => {
				resolve(note.id);
			};

			request.onerror = (event) => {
				reject((event.target as IDBRequest).error);
			};
		});
	}

	async getNote(id: string): Promise<Note | undefined> {
		const db = await this.#db;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([this.#store], 'readonly');
			const objectStore = transaction.objectStore(this.#store);
			const request = objectStore.get(id);

			request.onsuccess = (event) => {
				resolve((event.target as IDBRequest).result);
			};

			request.onerror = (event) => {
				reject((event.target as IDBRequest).error);
			};
		});
	}

	async updateNote(note: Note): Promise<void> {
		const db = await this.#db;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([this.#store], 'readwrite');
			const objectStore = transaction.objectStore(this.#store);
			const request = objectStore.put(note);

			request.onsuccess = () => {
				resolve();
			};

			request.onerror = (event) => {
				reject((event.target as IDBRequest).error);
			};
		});
	}

	async deleteNote(id: string): Promise<void> {
		const db = await this.#db;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([this.#store], 'readwrite');
			const objectStore = transaction.objectStore(this.#store);
			const request = objectStore.delete(id);

			request.onsuccess = () => {
				resolve();
			};

			request.onerror = (event) => {
				reject((event.target as IDBRequest).error);
			};
		});
	}

	async getAllNotes(): Promise<Note[]> {
		const db = await this.#db;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction([this.#store], 'readonly');
			const objectStore = transaction.objectStore(this.#store);
			const request = objectStore.getAll();

			request.onsuccess = (event) => {
				resolve((event.target as IDBRequest).result as Note[]);
			};

			request.onerror = (event) => {
				reject((event.target as IDBRequest).error);
			};
		});
	}
}
