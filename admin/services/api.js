const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token') || null;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(method, endpoint, data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/login';
        throw new Error('Token expirado. Faça login novamente.');
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro na requisição');
      }

      return responseData;
    } catch (error) {
      console.error(`Erro em ${method} ${endpoint}:`, error);
      throw error;
    }
  }

  async login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  }

  async logout() {
    this.clearToken();
    return this.request('POST', '/auth/logout');
  }

  async verifyAuth() {
    return this.request('GET', '/auth/verify');
  }

  async getProducts() {
    return this.request('GET', '/products');
  }

  async getProduct(id) {
    return this.request('GET', `/products/${id}`);
  }

  async createProduct(data) {
    return this.request('POST', '/products', data);
  }

  async updateProduct(id, data) {
    return this.request('PUT', `/products/${id}`, data);
  }

  async deleteProduct(id) {
    return this.request('DELETE', `/products/${id}`);
  }

  async uploadProductImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${API_BASE_URL}/upload/product`;
    const config = {
      method: 'POST',
      headers: {}
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...config,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload');
    }

    return response.json();
  }

  async uploadPostImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${API_BASE_URL}/upload/post`;
    const config = {
      method: 'POST',
      headers: {}
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...config,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload');
    }

    return response.json();
  }

  async getOrders() {
    return this.request('GET', '/orders');
  }

  async getOrder(id) {
    return this.request('GET', `/orders/${id}`);
  }

  async createOrder(data) {
    return this.request('POST', '/orders', data);
  }

  async updateOrderStatus(id, status) {
    return this.request('PUT', `/orders/${id}`, { status });
  }

  async getPosts() {
    return this.request('GET', '/posts');
  }

  async getPost(id) {
    return this.request('GET', `/posts/${id}`);
  }

  async createPost(data) {
    return this.request('POST', '/posts', data);
  }

  async updatePost(id, data) {
    return this.request('PUT', `/posts/${id}`, data);
  }

  async deletePost(id) {
    return this.request('DELETE', `/posts/${id}`);
  }
}

export default new ApiService();
