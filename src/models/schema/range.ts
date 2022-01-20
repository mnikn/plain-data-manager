import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaRangeTypeConfig extends SchemaFieldConfig {
  public type: "float" | "int" = "int";
  public minValue: number = 0;
  public maxValue: number = 100;
}
export class SchemaRangeField extends SchemaField<
  Array<number>,
  SchemaRangeTypeConfig
> {
  public typeConfig = new SchemaRangeTypeConfig();
  public type = SchemaFieldType.Array;
  public validate(): boolean {
    return true;
  }

  clone(): SchemaRangeField {
    const instance = new SchemaRangeField();
    instance.value = this.value;
    return instance;
  }
}
