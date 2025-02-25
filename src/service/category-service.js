import { BASE_BACKEND_API_URL } from "@/config/env";

export async function fetchCategories({
  per_page = "10",
  page = "1",
  search = "",
  sort_by = "",
  parent_code = "",
  status = "",
  main_category = "0",
} = {}) {
  const queryParams = new URLSearchParams({
    per_page,
    page,
    search,
    sort_by,
    parent_code,
    status,
    main_category,
  });
  try {
    const response = await fetch(
      `${BASE_BACKEND_API_URL}categories?${queryParams}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array or a fallback value
  }
}

export async function fetchCategory({ id }) {
  try {
    const response = await fetch(`${BASE_BACKEND_API_URL}categories/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch category id" + id);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching category id:" + id, error);
    return {};
  }
}
