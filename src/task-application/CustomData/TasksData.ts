import type { Task } from "./Tasks";

class TasksApi {
  getTasks = (): Promise<Task[]> => {
    const tasks: Task[] = [
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "Increase text size",
        description:
          "Please change the font size of the text from the button on landing page from 12 to 16.",
        createdDate: "Sat Aug 26 2023 22:23:24 GMT+0300",
      },
      {
        id: "98aadf29-0f0b-4876-b73a-3c857df32559",
        title: "Change button color",
        description: "Please change the color of the button on details page.",
        createdDate: "Sat Aug 22 2023 22:23:24 GMT+0300",
      },
      {
        id: "f4a8ccab-2a74-4b80-b2b5-bc09e1eb0d2d",
        title:
          "This book is a treatise on the theory of ethics, very popular during the Renaissance",
        description:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        createdDate: "Sat Mar 05 2023 22:23:24 GMT+0300",
      },
      {
        id: "4b133e91-26a9-4815-9973-4fd4a859fc29",
        title:
          "All the Lorem Ipsum generators on the Internet tend to repeat predefined",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority",
        createdDate: "Sat Jan 01 2022 22:23:24 GMT+0300",
      },
      {
        id: "5d9b323b-5ba0-4ff2-82cf-f4dd87e87471",
        title: "At vero eos et accusamus et iusto odio dignissimos",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        createdDate: "Sat Aug 22 1918 22:23:24 GMT+0300",
      },
    ];
    return Promise.resolve(tasks);
  };
}

export const tasksApi = new TasksApi();
