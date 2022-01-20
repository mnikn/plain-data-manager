import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaNumberTypeConfig extends SchemaFieldConfig {
  public type: "float" | "int" = "int";
  public minValue: number = 0;
  public maxValue: number = 100;
}
export class SchemaNumberField extends SchemaField<
  number,
  SchemaNumberTypeConfig
> {
  public typeConfig = new SchemaNumberTypeConfig();
  public type = SchemaFieldType.Number;
  public validate(): boolean {
    return true;
  }
  constructor() {
    super();
    this.value = 0;
  }

  clone(): SchemaNumberField {
    const instance = new SchemaNumberField();
    instance.key = this.key;
    instance.value = this.value;
    return instance;
  }
}
