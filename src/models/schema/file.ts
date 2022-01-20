import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";

export class SchemaFileTypeConfig extends SchemaFieldConfig {
  public type: "img" | "blob" = "img";
  public baseUrl: string = "";
}
export class SchemaFileField extends SchemaField<string, SchemaFileTypeConfig> {
  public typeConfig = new SchemaFileTypeConfig();
  public type = SchemaFieldType.File;
  public validate(): boolean {
    return true;
  }

  public clone(): SchemaFileField {
    const instance = new SchemaFileField();
    instance.key = this.key;
    instance.value = this.value;
    return instance;
  }
}
