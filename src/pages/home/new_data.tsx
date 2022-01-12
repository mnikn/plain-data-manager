import { Button, Modal, Space } from "antd";
import I18n from "../../platform/i18n";
import { useEffect } from "react";
import { ElectronEvent } from "platform/constants";
const electron = (window as any).electron;

const NewDataModal = ({
  visible,
  close,
  showNewProject,
}: {
  visible: boolean;
  close: () => void;
  showNewProject: () => void;
}) => {
  const selectProject = () => {
    electron.ipcRenderer.send(ElectronEvent.ShowOpenDialog);
  };

  useEffect(() => {
    electron.ipcRenderer.on(
      ElectronEvent.ReceiveOpenDialogData,
      (_: any, data: any) => {
        console.log("data: ", data);
      }
    );
  }, []);
  return (
    <Modal
      visible={visible}
      onCancel={close}
      title={I18n.t("no-data")}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <Space
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Button onClick={showNewProject}>{I18n.t("project:new")}</Button>
        <Button onClick={selectProject}>{I18n.t("project:load")}</Button>
      </Space>
    </Modal>
  );
};

export default NewDataModal;
