import { Schema, SchemaFieldType } from "./schema";
import { generateUUID } from "utils/uuid";
import { SchemaArrayField } from "./schema/array";

export default class Item {
  public id: string = generateUUID();
  public schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema.clone();
  }

  public toJson(): any {
    return this.schema.toJson();
  }
  public toDataJson(): any {
    const data = this.toJson();
    return this.getDataJson(data.fields);
  }

  private getDataJson(fields: any[]): any {
    return fields.reduce((res: any, item: any) => {
      if ([SchemaFieldType.Object].includes(item.type)) {
        if (item.fields) {
          res[item.key] = this.getDataJson(item.fields);
          return res;
        }
      }
      if (item.key) {
        res[item.key] = Array.isArray(item.value)
          ? item.value.map((item: any) => item.value)
          : item.value;
      }
      return res;
    }, {});
  }
}
