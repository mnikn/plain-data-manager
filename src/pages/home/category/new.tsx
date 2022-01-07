import { Form, Input, Modal } from "antd";
import Category from "models/category";
import I18n from "platform/i18n";

const NewCategoryModal = ({
  visible,
  close,
  onCreate,
}: {
  visible: boolean;
  close: () => void;
  onCreate: (category: Category) => void;
}) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = new Category();
        data.id = values.id;
        data.name = values.name;
        onCreate(data);
        form.resetFields();
      })
      .catch((info) => {
        console.log("err: ", info);
      })
      .finally(() => {
        close();
      });
  };
  return (
    <Modal
      visible={visible}
      onOk={onSubmit}
      onCancel={close}
      title={I18n.t("category:setting")}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Form.Item
          label={I18n.t("category:setting:id")}
          name="id"
          rules={[
            {
              required: true,
              message: I18n.t("category:setting:id:validator-require"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={I18n.t("category:setting:name")}
          name="name"
          rules={[
            {
              required: true,
              message: I18n.t("category:setting:name:validator-require"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategoryModal;
