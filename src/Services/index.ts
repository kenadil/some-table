export const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchRecordsAPI() {
  return fetch(`${API_URL}`)
    .then((response) => response.json())
    .catch((error: any) => console.log(error));
}

