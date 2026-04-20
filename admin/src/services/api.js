const API_URL = 'http://localhost:3000/api';

// ============ PRODUCTS ============

export const productService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    const data = await response.json();
    return data.data || [];
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    const data = await response.json();
    return data.data;
  },

  create: async (product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    const data = await response.json();
    return data.data;
  },

  update: async (id, product) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    const data = await response.json();
    return data.data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar produto');
    return await response.json();
  },
};

// ============ ORDERS ============

export const orderService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Erro ao buscar pedidos');
    const data = await response.json();
    return data.data || [];
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Pedido não encontrado');
    const data = await response.json();
    return data.data;
  },

  create: async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Erro ao criar pedido');
    const data = await response.json();
    return data.data;
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Erro ao atualizar pedido');
    const data = await response.json();
    return data.data;
  },
};

// ============ POSTS ============

export const postService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) throw new Error('Erro ao buscar posts');
    const data = await response.json();
    return data.data || [];
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Post não encontrado');
    const data = await response.json();
    return data.data;
  },

  create: async (post) => {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Erro ao criar post');
    const data = await response.json();
    return data.data;
  },

  update: async (id, post) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Erro ao atualizar post');
    const data = await response.json();
    return data.data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar post');
    return await response.json();
  },
};
