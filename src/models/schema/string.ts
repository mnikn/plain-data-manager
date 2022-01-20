import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaStringTypeConfig extends SchemaFieldConfig {
  minLen: number = 0;
  maxLen: number = 20;
}
export class SchemaStringField extends SchemaField<
  string,
  SchemaStringTypeConfig
> {
  public typeConfig = new SchemaStringTypeConfig();
  public type = SchemaFieldType.String;
  public validate(): boolean {
    return true;
  }
  constructor() {
    super();
    this.value = '';
  }

  clone(): SchemaStringField {
    const instance = new SchemaStringField();
    instance.key = this.key;
    instance.value = this.value;
    return instance;
  }
}
