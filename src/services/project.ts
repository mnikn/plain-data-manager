import Project from "../models/project";

class ProjectService {
  private static project: Project;

  public static async createProject(data: Project) {
    this.project = data;
  }

  public static async loadProject(location: string) {}

  public static async getProject() {
    return this.project;
  }
}

export default ProjectService;
