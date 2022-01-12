import Eventemitter from "eventemitter3";

export enum EventType {
  CreateCategory = "create_category",
}

export default new Eventemitter();
