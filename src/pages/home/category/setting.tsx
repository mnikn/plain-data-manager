import { Form, Input, Modal } from "antd";
import Category from "models/category";
import { Schema } from "models/schema";
import buildSchema from "models/schema/builder";
import { SchemaStringField } from "models/schema/string";
import I18n from "platform/i18n";
import { useContext, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import Context from "../context";

interface FormData {
  id: string;
  name: string;
  schema: string;
}

const CategorySettingModal = ({
  visible,
  onSubmit,
  close,
}: {
  visible: boolean;
  onSubmit: (category: Category) => void;
  close: () => void;
}) => {
  const { currentCategory } = useContext(Context);
  const [form] = Form.useForm<FormData>();

  useEffect(() => {
    form.setFieldsValue({
      id: currentCategory.id,
      name: currentCategory.name,
      schema: currentCategory.schema.toString(),
    });
  }, [currentCategory, form]);

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = new Category();
        data.id = values.id;
        data.name = values.name;
        const schema = buildSchema(JSON.parse(values.schema));
        data.schema = schema;
        onSubmit(data);
        form.resetFields();
        close();
      })
      .catch((info) => {
        console.error("err: ", info);
      });
  };

  const onSchemaChange = (value: string) => {
    form.setFieldsValue({
      schema: value,
    });
  };
  return (
    <Modal
      title={I18n.t("category:setting")}
      visible={visible}
      onOk={submit}
      onCancel={close}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        form={form}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Item label={I18n.t("category:setting:id")} name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label={I18n.t("category:setting:name")} name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label={I18n.t("category:setting:schema")}>
          <MonacoEditor
            width="390"
            height="400"
            language="json"
            theme="vs-dark"
            onChange={onSchemaChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategorySettingModal;
