import { useCallback, useState } from "react";

export default function useModal() {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    show,
    close,
  };
}
