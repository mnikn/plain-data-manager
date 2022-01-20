import {
  Button,
  Card,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Upload,
} from "antd";
import {
  Schema,
  SchemaField,
  SchemaFieldConfig,
  SchemaFieldType,
} from "models/schema";
import { CloseOutlined } from "@ant-design/icons";
import { SchemaStringField } from "models/schema/string";
import I18n from "platform/i18n";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import context from "./context";
import Event, { EventType } from "./event";
import Item from "models/item";
import { SchemaNumberField } from "models/schema/number";
import { SchemaObjectField } from "models/schema/object";
import { SchemaArrayField } from "models/schema/array";
import { SchemaFileField } from "models/schema/file";

const Style = styled.div`
  padding: 20px;
  .add {
    width: 100%;
  }

  .form {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: auto;
    grid-gap: 10px 10px;
  }
`;

const StyleEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const HomeContent = () => {
  const { currentCategory } = useContext(context);

  const showCreateCategory = () => {
    Event.emit(EventType.CreateCategory);
  };

  useEffect(() => {
    console.log(
      currentCategory.data.map((item) => {
        return item.toDataJson();
      })
    );
  }, [currentCategory]);

  if (!currentCategory.id) {
    return (
      <StyleEmpty>
        <Button onClick={showCreateCategory}>{I18n.t("category:new")}</Button>
      </StyleEmpty>
    );
  }

  const addItem = () => {
    const itemData = new Item(currentCategory.schema);
    Event.emit(
      EventType.UpdateCategoryData,
      currentCategory.data.concat(itemData)
    );
  };

  const removeItem = (i: number) => {
    Event.emit(
      EventType.UpdateCategoryData,
      currentCategory.data.filter((_, index) => index !== i)
    );
  };

  const renderItem = (item: SchemaObjectField | Schema, i: number) => {
    const renderSubItem = (
      schemaItem: SchemaField<unknown, SchemaFieldConfig>
    ) => {
      switch (schemaItem.type) {
        case SchemaFieldType.String: {
          const typedSchemaItem = schemaItem as SchemaStringField;
          const typeConfig = typedSchemaItem.typeConfig;
          const onValueChange = (e: any) => {
            typedSchemaItem.value = e.target.value;
            Event.emit(EventType.UpdateCategoryData, currentCategory.data);
          };
          const value = typedSchemaItem.value || "";
          return (
            <Form.Item
              key={schemaItem.id}
              label={schemaItem.key}
              style={{ marginRight: "12px" }}
              rules={[{ required: typeConfig.optional }]}
            >
              <Input
                maxLength={typedSchemaItem.typeConfig.maxLen}
                minLength={typedSchemaItem.typeConfig.minLen}
                value={value}
                onChange={onValueChange}
              />
            </Form.Item>
          );
        }
        case SchemaFieldType.Number: {
          const typedSchemaItem = schemaItem as SchemaNumberField;
          const typeConfig = typedSchemaItem.typeConfig;
          const onValueChange = (value: number) => {
            typedSchemaItem.value = value;
            Event.emit(EventType.UpdateCategoryData, currentCategory.data);
          };
          const value = typedSchemaItem.value || 0;
          return (
            <Form.Item
              key={schemaItem.id}
              label={schemaItem.key}
              style={{ marginRight: "12px" }}
              rules={[{ required: typeConfig.optional }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                maxLength={typedSchemaItem.typeConfig.maxValue}
                minLength={typedSchemaItem.typeConfig.minValue}
                value={value}
                onChange={onValueChange}
              />
            </Form.Item>
          );
        }
        case SchemaFieldType.File: {
          const typedSchemaItem = schemaItem as SchemaFileField;
          const typeConfig = typedSchemaItem.typeConfig;
          const value = typedSchemaItem.value || "";
          const uploadButton = <div style={{ marginTop: 8 }}>Upload</div>;
          const onChange = (info: any) => {
            console.log("info: ", info);
          };
          return (
            <Form.Item
              key={schemaItem.id}
              label={schemaItem.key}
              rules={[{ required: typeConfig.optional }]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={onChange}
              >
                {value ? (
                  <img src={value} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          );
        }
        case SchemaFieldType.Object: {
          const typedSchemaItem = schemaItem as SchemaObjectField;
          return renderItem(typedSchemaItem, i);
        }
      }
      return null;
    };

    const content = (
      <div style={{ width: "100%", gridColumnStart: "span 1" }}>
        <Collapse defaultActiveKey={i} expandIconPosition="left">
          <Collapse.Panel
            header={`${
              item instanceof Schema
                ? "#" + String(i + 1)
                : item.key || "#" + String(i + 1)
            }`}
            key={i}
            extra={
              <CloseOutlined
                style={{ cursor: "pointer" }}
                onClick={() => removeItem(i)}
              />
            }
          >
            <div className="form" key={i}>
              {item.fields.map((schemaItem) => {
                if (schemaItem.type !== SchemaFieldType.Array) {
                  return renderSubItem(schemaItem);
                }

                const typedSchemaItem = schemaItem as SchemaArrayField;
                const addListItem = () => {
                  typedSchemaItem.value = (typedSchemaItem.value || []).concat(
                    typedSchemaItem.itemSchema?.clone()
                  );
                  Event.emit(
                    EventType.UpdateCategoryData,
                    currentCategory.data
                  );
                };
                const removeListItem = (j: number) => {
                  typedSchemaItem.value = (typedSchemaItem.value || []).filter(
                    (_, ii) => ii !== j
                  );
                  Event.emit(
                    EventType.UpdateCategoryData,
                    currentCategory.data
                  );
                };

                return (
                  <Form.Item
                    label={schemaItem.key}
                    style={{
                      gridColumnStart: "span 1",
                    }}
                  >
                    <Button
                      className="add"
                      type="dashed"
                      onClick={addListItem}
                      style={{ marginBottom: "6px" }}
                    >
                      {I18n.t("content:add_item")}
                    </Button>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {(typedSchemaItem.value || []).map((subItem, j) => {
                        return (
                          <Collapse
                            defaultActiveKey={j}
                            expandIconPosition="left"
                            style={{ marginBottom: "6px" }}
                          >
                            <Collapse.Panel
                              header={`#${j + i}`}
                              key={j}
                              extra={
                                <CloseOutlined
                                  style={{ cursor: "pointer" }}
                                  onClick={() => removeListItem(j)}
                                />
                              }
                            >
                              {renderSubItem(subItem)}
                            </Collapse.Panel>
                          </Collapse>
                        );
                      })}
                    </div>
                  </Form.Item>
                );
              })}
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
    );
    return content;
  };

  return (
    <Style>
      <Button className="add" type="dashed" onClick={addItem}>
        {I18n.t("content:add_item")}
      </Button>

      <Divider />

      {currentCategory.data.map((item, i) => {
        return (
          <div key={i}>
            <Form style={{ width: "100%" }} key={i}>
              {renderItem(item.schema, i)}
            </Form>
            <Divider />
          </div>
        );
      })}
    </Style>
  );
};

export default HomeContent;
