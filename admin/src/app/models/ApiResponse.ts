import {Language} from './Language';

export class ApiResponse {
    constructor(
        public status: boolean,
        public message: string,
        public data: any,
        public labels: any,
        public current_language: Language
    ) {}
}
