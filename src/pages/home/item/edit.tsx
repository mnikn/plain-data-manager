import { Modal } from "antd";
import I18n from "platform/i18n";

const ItemEditModal = ({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={close}
      title={I18n.t("content:add_item")}
    ></Modal>
  );
};

export default ItemEditModal;
