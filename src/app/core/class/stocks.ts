import { Tags } from "./tags";

export class Stock {
  _id: string;
  name: string;
  description: string;
  qty: number;
  image_link: string;
  tags: Tags[];
  created_at: Date;
  updated_at: Date;
  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    qty: number = 0,
    image_link: string = '',
    tags: Tags[] = [],
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.qty = qty;
    this.image_link = image_link;
    this.tags = tags;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}