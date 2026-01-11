import axios from "axios";
import { setings } from '../setings';

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: `http://${setings.HOST}:${setings.PORT}/`,
});

// ============================
// Вспомогательные функции для работы с токеном
// ============================

/**
 * Получает токен из localStorage
 * Поддерживает два формата: просто строка или JSON-объект {token: "..."}
 */
const getTokenFromStorage = () => {
  try {
    const tokenData = localStorage.getItem("token");
    
    if (!tokenData) return null;
    
    // Пытаемся распарсить JSON, если это объект
    if (tokenData.startsWith('{') || tokenData.startsWith('[')) {
      const parsed = JSON.parse(tokenData);
      return parsed.token || parsed.accessToken || null;
    }
    
    // Если это просто строка, возвращаем как есть
    return tokenData;
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    return null;
  }
};

/**
 * Сохраняет токен в localStorage
 * @param {string} token - Токен для сохранения
 * @param {boolean} asJson - Сохранять как JSON-объект или как строку
 */
const saveTokenToStorage = (token, asJson = false) => {
  try {
    if (asJson) {
      localStorage.setItem("token", JSON.stringify({ token }));
    } else {
      localStorage.setItem("token", token);
    }
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
  }
};

/**
 * Удаляет токен из localStorage
 */
const removeTokenFromStorage = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
};

// ============================
// Интерцептор запросов
// ============================

apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================
// Интерцептор ответов
// ============================

apiClient.interceptors.response.use(
  (response) => {
    if(response.status === 200 && response.data.token != undefined && response.data.token != null){
      const newToken = response.data.token;
      saveTokenToStorage(newToken, false);
    }
    return response;
  },
  async (error) => {
    /**
     * ТУТ БУДЕТ ЛОГИКА ОБРАБОТКИ ОТВЕТОВ С ОШИБКАМИ
     */
    return console.log(error)
    const originalRequest = error.config;
    
    // Проверяем, что у нас есть response (сетевые ошибки могут не иметь response)
    if (!error.response) {
      console.error("Network error or server not responding:", error.message);
      return Promise.reject(error);
    }
    
    // Логируем ошибку для отладки
    console.log(`HTTP Error ${error.response.status}: ${error.response.statusText}`);
    
    // Проверяем код ошибки 401 и что запрос еще не повторялся
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      console.log("Access token expired, attempting to refresh...");
      
      // Помечаем запрос как повторный
      originalRequest._isRetry = true;
      
      try {
        // Запрашиваем новый токен
        // ВАЖНО: Убедитесь, что /api/refresh возвращает правильную структуру
        const response = await apiClient.get("/api/refresh");
        
        // Отладочная информация
        console.log("Refresh response:", response.data);
        
        // Извлекаем новый токен из ответа
        // ВАЖНО: Адаптируйте эту часть под структуру ответа вашего сервера
        let newToken = null;
        
        if (response.data) {
          // Проверяем разные возможные форматы ответа
          if (response.data.token) {
            newToken = response.data.token;
          } else if (response.data.accessToken) {
            newToken = response.data.accessToken;
          } else if (response.data.access_token) {
            newToken = response.data.access_token;
          } else if (typeof response.data === 'string') {
            // Если сервер возвращает просто строку с токеном
            newToken = response.data;
          } else {
            console.error("Unknown token format in refresh response:", response.data);
            throw new Error("Invalid token format in refresh response");
          }
        }
        
        if (!newToken) {
          throw new Error("No token received from refresh endpoint");
        }
        
        console.log("New token received, saving...");
        
        // Сохраняем новый токен
        // ВАЖНО: Используйте тот же формат, что и при сохранении после логина
        saveTokenToStorage(newToken, false); // Измените на true, если храните как JSON
        
        // Обновляем заголовок Authorization для повторного запроса
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        console.log("Retrying original request with new token...");
        
        // Повторяем оригинальный запрос
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        
        // Очищаем токен
        removeTokenFromStorage();
        
        // Если это браузерная среда, перенаправляем на страницу логина
        if (typeof window !== 'undefined') {
          console.log("Redirecting to login page...");
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Для всех других ошибок просто пробрасываем их дальше
    return Promise.reject(error);
  }
);

// ============================
// API для работы с авторизацией
// ============================

export const authAPI = {
  /**
   * Устанавливает токен
   * @param {string} token - Токен
   * @param {boolean} asJson - Сохранять как JSON объект
   */
  setToken: (token, asJson = false) => {
    saveTokenToStorage(token, asJson);
  },
  
  /**
   * Получает токен
   * @returns {string|null} Токен или null
   */
  getToken: () => {
    return getTokenFromStorage();
  },
  
  /**
   * Удаляет токен (выход)
   */
  clearToken: () => {
    removeTokenFromStorage();
  },
  
  /**
   * Проверяет наличие токена
   * @returns {boolean} true если токен существует
   */
  hasToken: () => {
    return !!getTokenFromStorage();
  },
  
  /**
   * Проверяет, является ли ошибка ошибкой авторизации
   * @param {Error} error - Ошибка axios
   * @returns {boolean} true если ошибка 401
   */
  isAuthError: (error) => {
    return error.response && error.response.status === 401;
  },
  
  /**
   * Обновляет токен вручную
   * @returns {Promise<string>} Новый токен
   */
  refreshToken: async () => {
    try {
      const response = await apiClient.get("/api/refresh");
      let newToken = null;
      
      if (response.data.token) {
        newToken = response.data.token;
      } else if (response.data.accessToken) {
        newToken = response.data.accessToken;
      } else if (typeof response.data === 'string') {
        newToken = response.data;
      }
      
      if (newToken) {
        saveTokenToStorage(newToken, false);
        return newToken;
      } else {
        throw new Error("Invalid token format in response");
      }
    } catch (error) {
      console.error("Manual token refresh failed:", error);
      removeTokenFromStorage();
      throw error;
    }
  }
};

// ============================
// API методы для запросов с автоматической обработкой ошибок
// ============================

export const api = {
  /**
   * GET запрос
   */
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${url} error:`, error);
      throw error;
    }
  },
  
  /**
   * POST запрос
   */
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${url} error:`, error);
      throw error;
    }
  },
  
  /**
   * PUT запрос
   */
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT ${url} error:`, error);
      throw error;
    }
  },
  
  /**
   * DELETE запрос
   */
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${url} error:`, error);
      throw error;
    }
  },
  
  /**
   * PATCH запрос
   */
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${url} error:`, error);
      throw error;
    }
  }
};

// ============================
// Дополнительные утилиты
// ============================

/**
 * Устанавливает заголовок Authorization вручную
 * @param {string} token - Токен
 */
export const setAuthHeader = (token) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Удаляет заголовок Authorization
 */
export const clearAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

/**
 * Проверяет, активна ли сессия
 * @returns {Promise<boolean>} true если сессия активна
 */
export const checkSession = async () => {
  try {
    await apiClient.get("/api/check-session");
    return true;
  } catch (error) {
    return false;
  }
};

export default apiClient;