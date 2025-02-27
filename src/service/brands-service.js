import { BASE_BACKEND_API_URL } from "@/config/env";

export async function fetchBrands({
  per_page = "10",
  page = "1",
  search = "",
  sort_by = "",
  status = "",
  main_category = "0",
} = {}) {
  const queryParams = new URLSearchParams({
    per_page,
    page,
    search,
    sort_by,
    status,
    main_category,
  });
  try {
    const response = await fetch(
      `${BASE_BACKEND_API_URL}brands?${queryParams}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return []; // Return an empty array or a fallback value
  }
}

export async function fetchBrand({ id }) {
  try {
    const response = await fetch(`${BASE_BACKEND_API_URL}brands/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brand id" + id);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching brand id:" + id, error);
    return {};
  }
}
