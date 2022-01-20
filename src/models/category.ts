import Item from "./item";
import { Schema } from "./schema";

export default class Category {
  public id: string = "";
  public name: string = "";
  public schema = new Schema();
  public data: Item[] = [];
}
