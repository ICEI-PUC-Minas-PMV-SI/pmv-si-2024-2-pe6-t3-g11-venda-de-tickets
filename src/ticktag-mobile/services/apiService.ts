const API_URL: string = "http://192.168.1.12:8080";
const getToken = () => "";
const token: string = getToken();

export async function createData(endpoint: string, data: Object) {
  // const token = getToken();
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao criar dados");
  return await response.json();
}

// Função para atualizar dados (PUT) com token de autenticação
export async function updateData(endpoint: string, data: Object) {
  // const token = getToken();
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar dados");
  return await response.json();
}

// Função para excluir dados (DELETE) com token de autenticação
export async function deleteData(endpoint: string) {
  // const token = getToken();
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao excluir dados");
  return await response.json();
}

// Função para lidar com requisições GET com token de autenticação
export async function fetchData(endpoint: string) {
  // const token = getToken();
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar dados");
  return await response.json();
}
