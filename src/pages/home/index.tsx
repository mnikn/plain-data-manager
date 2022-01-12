import { Layout, Menu } from "antd";
import styled from "styled-components";
import Category from "models/category";
import { useEffect, useState } from "react";
import I18n from "platform/i18n";
import NewCategoryModal from "./category/new";
import useModal from "utils/hooks/use_modal";
import Project from "models/project";
import ProjectEditModal from "./project/edit";
import ProjectService from "services/project";
import NewDataModal from "./new_data";
import Context from "./context";
import HomeContent from "./content";
import Event, { EventType } from "./event";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const StyleProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;

  .item {
    display: flex;
    word-break: break-all;
  }
`;

export default function Home() {
  const [project, setProject] = useState<Project>(new Project());
  const [currentCategory, setCurrentCategory] = useState<Category>(
    new Category()
  );

  const {
    visible: newCatrgoryVisible,
    show: showNewCatrgory,
    close: closeNewCatrgory,
  } = useModal();
  const {
    visible: projectEditVisible,
    show: showProjectEdit,
    close: closeProjectEdit,
  } = useModal();
  const {
    visible: newDataVisible,
    show: showNewData,
    close: closeNewData,
  } = useModal();

  const onCategoryCreated = (category: Category) => {
    project.categories.push(category);
    setCurrentCategory(category);
  };
  const createProject = (data: Project) => {
    setProject(data);
    ProjectService.createProject(data);
  };

  useEffect(() => {
    if (!project.location) {
      showNewData();
    } else {
      closeNewData();
    }
  }, [project, showNewData, closeNewData]);

  useEffect(() => {
    Event.on(EventType.CreateCategory, showNewCatrgory);
    return () => {
      Event.off(EventType.CreateCategory, showNewCatrgory);
    };
  }, [showNewCatrgory]);

  return (
    <Context.Provider
      value={{
        currentProject: project,
        currentCategory,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Menu mode="horizontal">
          <SubMenu key="project" title={I18n.t("project")}>
            <Menu.Item key="project-new" onClick={showProjectEdit}>
              {I18n.t("project:new")}
            </Menu.Item>
            <Menu.Item key="project-switch">
              {I18n.t("project:switch")}
            </Menu.Item>
            <Menu.Item key="project-setting">
              {I18n.t("project:setting")}
            </Menu.Item>
          </SubMenu>
          <SubMenu key="category" title={I18n.t("category")}>
            <Menu.Item key="category-new" onClick={showNewCatrgory}>
              {I18n.t("category:new")}
            </Menu.Item>
            <Menu.Item key="category-delete" disabled={!currentCategory.id}>
              {I18n.t("category:delete")}
            </Menu.Item>
            <Menu.Item key="category-setting">
              {I18n.t("category:setting")}
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Layout>
          <Sider collapsible>
            {!!project.name && (
              <StyleProjectInfo>
                <div className="item">
                  {I18n.t("project")}: {project.name}
                </div>
              </StyleProjectInfo>
            )}
            <Menu selectedKeys={[currentCategory.id]} mode="inline">
              {project.categories.map((item) => {
                return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
              })}
            </Menu>
          </Sider>
          <Content>
            <HomeContent />
          </Content>
        </Layout>

        <NewCategoryModal
          visible={newCatrgoryVisible}
          close={closeNewCatrgory}
          onCreate={onCategoryCreated}
        />
        <ProjectEditModal
          visible={projectEditVisible}
          close={closeProjectEdit}
          onSubmit={createProject}
        />
        <NewDataModal
          visible={newDataVisible}
          close={closeNewData}
          showNewProject={() => {
            showProjectEdit();
          }}
        />
      </Layout>
    </Context.Provider>
  );
}
