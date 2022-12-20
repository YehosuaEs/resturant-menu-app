export class Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public subcategory: string,
    public description: string,
    public img: string,
    public price: number
  ) {}
}

export interface Subcategory {
  value: string;
}
