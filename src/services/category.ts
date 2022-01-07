import Category from "models/category";

class CategoryService {
  private static categories: Category[] = [];

  public static async create(category: Category) {
    this.categories.push(category);
  }
}

export default CategoryService;
