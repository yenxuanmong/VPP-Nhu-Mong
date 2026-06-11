const API_BASE = '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Lỗi không xác định' }));
    throw new ApiError(data.error || 'Lỗi không xác định', res.status);
  }

  return res.json();
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DbProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  badge: string | null;
  salePercent: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DbPricingRow {
  id: string;
  category: string;
  format: string;
  weight: string;
  quantity: string;
  price: string;
  sortOrder: number;
}

export interface DbReview {
  id: string;
  userId: string | null;
  productId: string | null;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  product?: { id: string; name: string } | null;
  user?: { id: string; name: string } | null;
}

export interface DashboardData {
  stats: {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    pendingReviews: number;
    totalProducts: number;
  };
  productRankings: Array<{
    rank: number;
    product: { id: string; name: string; image: string; price: number } | undefined;
    totalQuantity: number;
    orderCount: number;
  }>;
  userRankings: Array<{
    rank: number;
    user: { id: string; name: string; email: string } | undefined;
    totalSpent: number;
    orderCount: number;
  }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  recentOrders: Array<{
    id: string;
    totalAmount: number;
    createdAt: string;
    user: { name: string; email: string };
    items: Array<{ product: { name: string } }>;
  }>;
}

export const api = {
  auth: {
    register: (data: { email: string; password: string; name: string }) =>
      request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    me: () => request<{ user: User }>('/auth/me'),
  },

  products: {
    list: () => request<DbProduct[]>('/products'),
    get: (id: string) => request<DbProduct>(`/products/${id}`),
    create: (data: Partial<DbProduct>) =>
      request<DbProduct>('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<DbProduct>) =>
      request<DbProduct>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ message: string }>(`/products/${id}`, { method: 'DELETE' }),
  },

  pricing: {
    list: (category?: string) =>
      request<DbPricingRow[]>(`/pricing${category ? `?category=${category}` : ''}`),
    create: (data: Partial<DbPricingRow>) =>
      request<DbPricingRow>('/pricing', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<DbPricingRow>) =>
      request<DbPricingRow>(`/pricing/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ message: string }>(`/pricing/${id}`, { method: 'DELETE' }),
  },

  reviews: {
    list: () => request<DbReview[]>('/reviews'),
    listAdmin: () => request<DbReview[]>('/reviews/admin'),
    create: (data: { text: string; rating: number; productId?: string }) =>
      request<DbReview>('/reviews', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      request<DbReview>(`/reviews/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    delete: (id: string) => request<{ message: string }>(`/reviews/${id}`, { method: 'DELETE' }),
  },

  dashboard: {
    get: () => request<DashboardData>('/dashboard'),
  },
};

export { ApiError };
