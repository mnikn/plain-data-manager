import Category from "models/category";
import Project from "models/project";
import React from "react";

interface Context {
  currentProject: Project;
  currentCategory: Category;
}

const defaultProject = new Project();
const context = React.createContext<Context>({
  currentProject: defaultProject,
  currentCategory: defaultProject.categories[0] || new Category(),
});
export default context;
