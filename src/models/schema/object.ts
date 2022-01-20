import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaObjectTypeConfig extends SchemaFieldConfig {}
export class SchemaObjectField extends SchemaField<
  Array<any>,
  SchemaObjectTypeConfig
> {
  public fields: SchemaField<unknown, SchemaFieldConfig>[] = [];
  public type = SchemaFieldType.Object;
  public typeConfig = new SchemaObjectTypeConfig();
  public validate(): boolean {
    return true;
  }

  clone(): SchemaObjectField {
    const instance = new SchemaObjectField();
    instance.key = this.key;
    instance.value = this.value;
    instance.fields = this.fields.map((item) => {
      return item.clone();
    });
    return instance;
  }

  public toJson(): any {
    return {
      type: this.type,
      key: this.key,
      typeConfig: this.typeConfig,
      value: this.value,
      fields: this.fields.map((item) => item.toJson()),
    };
  }
}
