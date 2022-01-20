import { SchemaField, SchemaFieldConfig, SchemaFieldType } from ".";
import { SchemaArrayField } from "./array";
import { SchemaFileField } from "./file";
import { SchemaNumberField } from "./number";
import { SchemaObjectField } from "./object";
import { SchemaStringField } from "./string";

export default function buildSchema(json: any): SchemaObjectField {
  const schema = new SchemaObjectField();

  Object.keys(json).forEach((key: string) => {
    const value = json[key];
    const res = buildSchemaItem(value, key);
    if (res) {
      schema.fields.push(res);
    }
  });
  return schema;
}

function buildSchemaItem(
  value: any,
  key = ""
): SchemaField<unknown, SchemaFieldConfig> | null {
  switch (value.type) {
    case SchemaFieldType.String: {
      const data = new SchemaStringField();
      data.key = key;
      if (value.maxLen !== undefined) {
        data.typeConfig.maxLen = value.maxLen;
      }
      if (value.minLen !== undefined) {
        data.typeConfig.minLen = value.minLen;
      }
      return data;
    }
    case SchemaFieldType.Number: {
      const data = new SchemaNumberField();
      data.key = key;
      if (value.maxLen !== undefined) {
        data.typeConfig.maxValue = value.maxValue;
      }
      if (value.minLen !== undefined) {
        data.typeConfig.minValue = value.minValue;
      }
      return data;
    }
    case SchemaFieldType.File: {
      const data = new SchemaFileField();
      data.key = key;
      if (value.baseUrl !== undefined) {
      }
      data.typeConfig.baseUrl = value.baseUrl || "";
      data.typeConfig.order = value.order || 1;
      data.typeConfig.type = value.type || "img";
      return data;
    }
    case SchemaFieldType.Array: {
      const data = new SchemaArrayField();
      data.key = key;
      data.itemSchema = buildSchemaItem(value.itemSchema);
      if (value.maxLen !== undefined) {
        data.typeConfig.maxLen = value.maxLen;
      }
      if (value.minLen !== undefined) {
        data.typeConfig.minLen = value.minLen;
      }
      return data;
    }
    case SchemaFieldType.Object: {
      const data = new SchemaObjectField();
      data.key = key;
      data.fields = Object.keys(value.fields)
        .map((itemKey) => {
          return buildSchemaItem(value.fields[itemKey], itemKey);
        })
        .filter((item) => !!item) as SchemaField<unknown, SchemaFieldConfig>[];

      return data;
    }
    case SchemaFieldType.Array: {
      const data = new SchemaArrayField();
      data.key = key;
      data.itemSchema = buildSchemaItem(value.itemSchema);
      return data;
    }
  }

  return null;
}
