export class FileInput {
	name: string;

	constructor(public file: File) {
		this.name = file.name;
	}
}