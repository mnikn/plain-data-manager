import { Form, Input, Modal } from "antd";
import Project from "models/project";
import I18n from "platform/i18n";

const ProjectEditModal = ({
  visible,
  close,
  onSubmit,
}: {
  visible: boolean;
  close: () => void;
  onSubmit: (project: Project) => void;
}) => {
  const [form] = Form.useForm();
  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = new Project();
        data.name = values.name;
        data.location = values.location;
        onSubmit(data);
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
      onOk={submit}
      onCancel={close}
      title={I18n.t("project:setting")}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Form.Item
          label={I18n.t("project:setting:name")}
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={I18n.t("project:setting:location")}
          name="location"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectEditModal;
