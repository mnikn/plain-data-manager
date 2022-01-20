import Eventemitter from "eventemitter3";

export enum EventType {
  CreateCategory = "create_category",
  UpdateCategoryData = "update_category_data",
}

export default new Eventemitter();
