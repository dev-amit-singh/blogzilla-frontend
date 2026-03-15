import API from "./api";

// Get all blogs (Admin)
export const getAdminBlogs = async () => {
  const res = await API.get("/blogs/admin-blogs");
  return res.data;
};

// Get public blogs
export const getPublicBlogs = async () => {
  const res = await API.get("/blogs/public-blogs");
  return res.data;
};

// Get single blog
export const getBlogBySlug = async (
  cateSlug: string,
  subCateSlug: string,
  slug: string
) => {
  const res = await API.get(
    `/blogs/${cateSlug}/${subCateSlug}/${slug}`
  );
  return res.data;
};

// Create blog
export const createBlog = async (data: any) => {
  const res = await API.post("/blogs", data);
  return res.data;
};

// Update blog
export const updateBlog = async (
  id: string,
  data: any
) => {
  const res = await API.put(`/blogs/${id}`, data);
  return res.data;
};

// Delete blog
export const deleteBlog = async (id: string) => {
  const res = await API.delete(`/blogs/${id}`);
  return res.data;
};

// Toggle active status
export const toggleBlogStatus = async (id: string) => {
  const res = await API.post(`/blogs/status/${id}`);
  return res.data;
};
