import { ref } from 'vue';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

export function useToast() {
  const addToast = (
    message: string,
    type: Toast['type'] = 'success',
    duration: number = 3000
  ) => {
    const id = ++toastIdCounter;

    toasts.value.push({
      id,
      message,
      type,
      duration
    });

    // Remove o toast automaticamente após a duração
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const showSuccess = (message: string, duration?: number) => {
    addToast(message, 'success', duration);
  };

  const showError = (message: string, duration?: number) => {
    addToast(message, 'error', duration);
  };

  const showInfo = (message: string, duration?: number) => {
    addToast(message, 'info', duration);
  };

  const showWarning = (message: string, duration?: number) => {
    addToast(message, 'warning', duration);
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
}