import service from "@/utils/request";

export const login = (data: {username: string; password: string}) => {
  return service.post("/user/login", data);
};

export const categoryTree = () => {
  return service.get("knowledge/category/tree");
};
export const articlePage = (params) => {
  return service.get("knowledge/article/page", {params});
};
