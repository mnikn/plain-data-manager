import { Button } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import I18n from "platform/i18n";
import context from "./context";
import Event, { EventType } from "./event";

const Style = styled.div``;

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

  if (!currentCategory.id) {
    return (
      <StyleEmpty>
        <Button onClick={showCreateCategory}>{I18n.t("category:new")}</Button>
      </StyleEmpty>
    );
  }

  return <Style>dd</Style>;
};

export default HomeContent;
