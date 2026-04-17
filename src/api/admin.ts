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

export const uploadFile = (file, businessInfo) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");
  return service.post("file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createArticle = (data) => {
  return service.post("knowledge/article", data);
};
export const getArticleDetail = (id: string) => {
  return service.get(`knowledge/article/${id}`);
};
export const editArticle = (id: string, data) => {
  return service.put(`knowledge/article/${id}`, data);
};
export const deleteArticle = (id: string) => {
  return service.delete(`knowledge/article/${id}`);
};
export const updateArticleStatus = (id: string, status: number) => {
  return service.put(`knowledge/article/${id}/status`, {status});
};

export const getConsultationPage = (params) => {
  return service.get("psychological-chat/sessions", {params});
};
export const getConsultationDetail = (id: string) => {
  return service.get(`psychological-chat/sessions/${id}/messages`);
};
