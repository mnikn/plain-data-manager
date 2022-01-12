import { Button, Form, Input, Modal } from "antd";
import Category from "models/category";
import Project from "models/project";
import { ElectronEvent } from "platform/constants";
import I18n from "platform/i18n";
import { useEffect } from "react";
const electron = (window as any).electron;

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
        close();
      })
      .catch((info) => {
        console.log("err: ", info);
      });
  };

  const selectLocation = () => {
    electron.ipcRenderer.send(ElectronEvent.ShowOpenDialog, {
      properties: ["openDirectory"],
    });
  };

  useEffect(() => {
    const receiveData = (_: any, data: any[]) => {
      form.setFieldsValue({
        location: data[0]?.path || "",
      });
    };
    electron.ipcRenderer.on(ElectronEvent.ReceiveOpenDialogData, receiveData);
  }, []);
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
          <Input
            type="button"
            onClick={selectLocation}
            style={{ textAlign: "left" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectEditModal;
