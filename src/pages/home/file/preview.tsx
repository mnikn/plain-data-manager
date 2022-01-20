import { Modal } from "antd";
import I18n from "platform/i18n";
import { useContext, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import Context from "../context";

const FilePreviewModal = ({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) => {
  const { currentCategory } = useContext(Context);
  const [json, setJson] = useState<string>("");

  useEffect(() => {
    const data = currentCategory.data.map((item) => {
      return item.toDataJson();
    });
    setJson(JSON.stringify(data, null, 4));
  }, [currentCategory]);

  return (
    <Modal
      title={I18n.t("file:preview")}
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <MonacoEditor
        width="470"
        height="400"
        language="json"
        theme="vs-dark"
        value={json}
        options={{
          readOnly: true,
        }}
      />
    </Modal>
  );
};

export default FilePreviewModal;
