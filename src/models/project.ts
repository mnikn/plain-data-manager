import Category from "./category";
import buildSchema from "./schema/builder";

export default class Project {
  public name: string = "";
  public location: string = "";
  public categories: Category[] = [];

  constructor() {
    this.name = "test";
    this.location = "dd";
    const category = new Category();
    category.id = "item";
    category.name = "item";
    this.categories.push(category);

    const json = {
      id: {
        type: "string",
        typeConfig: {
          minLen: 1,
          maxLen: 10,
        },
      },
      name: {
        type: "string",
      },
      image: {
        type: "file",
        typeConfig: {
          type: "img",
        },
      },
      items: {
        type: "array",
        itemSchema: {
          type: "string",
        },
      },
      user: {
        type: "object",
        fields: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
      },
      phone: {
        type: "number",
        typeConfig: {
          minValue: 1,
          maxValue: 10,
        },
      },
      // userList: {
      //   type: "array",
      //   itemSchema: {
      //     type: "object",
      //     fields: {
      //       id: {
      //         type: "string",
      //       },
      //       name: {
      //         type: "string",
      //       },
      //       phone: {
      //         type: "array",
      //         itemSchema: {
      //           type: "string",
      //         },
      //       },
      //     },
      //   },
      // },
    };
    category.schema = buildSchema(json);
  }
}
