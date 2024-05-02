export class product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public image: string,
        public status: string,
        public idCategory: number,
        public brands: string,
        public stock: number,
        public description: string
    ) {}
}