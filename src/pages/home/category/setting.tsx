import { Modal } from "antd";

const SettingContent = () => {
  return <div>dss</div>;
};

const SettingModal = ({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) => {
  return (
    <Modal visible={visible} onOk={close} onCancel={close}>
      <SettingContent />
    </Modal>
  );
};

export default SettingModal;
