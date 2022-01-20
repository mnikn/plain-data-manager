import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaArrayTypeConfig extends SchemaFieldConfig {
  public minLen: number = 0;
  public maxLen: number = 100;
}
export class SchemaArrayField extends SchemaField<
  Array<any>,
  SchemaArrayTypeConfig
> {
  public itemSchema: SchemaField<unknown, SchemaFieldConfig> | null = null;
  public typeConfig = new SchemaArrayTypeConfig();
  public type = SchemaFieldType.Array;
  public validate(): boolean {
    return true;
  }
  constructor() {
    super();
    this.value = [];
  }

  clone(): SchemaArrayField {
    const instance = new SchemaArrayField();
    instance.key = this.key;
    instance.value = this.value;
    if (this.itemSchema) {
      instance.itemSchema = this.itemSchema.clone();
    }
    return instance;
  }

  public toJson(): any {
    return {
      key: this.key,
      type: this.type,
      typeConfig: this.typeConfig,
      value: this.value,
      itemSchema: this.itemSchema?.toJson(),
    };
  }
}
