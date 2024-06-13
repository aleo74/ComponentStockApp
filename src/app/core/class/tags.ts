export class Tags {
  _id: string;
  name: string;
  color: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  constructor(
    id: string = '',
    name: string = '',
    description: string = '',
    color: string = '',
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
  ) {
    this._id = id;
    this.name = name;
    this.color = color;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
  