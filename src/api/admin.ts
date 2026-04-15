import service from "@/utils/request";

export const login = (data: {username: string; password: string}) => {
  return service.post("/user/login", data);
};
