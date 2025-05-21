/**
 * Utility function for making API requests with better error handling
 */
export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  // If the server replies with an error
  if (!response.ok) {
    const error = new Error(
      `An error occurred while fetching the data: ${response.statusText}`
    );
    // Add additional information to the error object
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Wrapper for POST requests
 */
export async function postData<T>(
  url: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Wrapper for PUT requests
 */
export async function putData<T>(
  url: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Wrapper for DELETE requests
 */
export async function deleteData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "DELETE",
  });
}