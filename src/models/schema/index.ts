import { generateUUID } from "utils/uuid";

export enum SchemaFieldType {
  String = "string",
  Number = "number",
  Range = "range",
  File = "file",
  Bool = "bool",
  Array = "array",
  Object = "object",
}

export class SchemaFieldConfig {
  public order: number = 1;
  public optional: boolean = false;
}

export abstract class SchemaField<T, TC extends SchemaFieldConfig> {
  public value: T | null = null;
  public key: string = "";
  public type: string = "";
  public abstract typeConfig: TC;

  public id: string = generateUUID();
  constructor() {}

  public abstract validate(): boolean;
  public abstract clone(): SchemaField<T, TC>;

  public toJson(): any {
    return {
      key: this.key,
      type: this.type,
      typeConfig: this.typeConfig,
      value: this.value,
    };
  }
}

export class Schema {
  public fields: SchemaField<unknown, SchemaFieldConfig>[] = [];

  public id: string = generateUUID();
  public validate(): boolean {
    return this.fields.reduce<boolean>((res, item) => {
      if (!res) {
        return res;
      }
      if (!item.validate()) {
        return false;
      }
      return res;
    }, true);
  }

  public toString(): string {
    return "";
  }

  public toJson(): any {
    return this.fields.reduce((res: any, item) => {
      res[item.key] = item.toJson();
      return res;
    }, {});
  }

  public clone(): Schema {
    const instance = new Schema();
    instance.fields = this.fields.map((item) => item.clone());
    return instance;
  }
}
