import { ref } from 'vue';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'warning';
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
    //verifica se aquele MESMO toast, com MESMA mensagem já não foi chamado
    const duplicateToast = toasts.value.find(
      toast => toast.message === message && toast.type === type
    );

    if (duplicateToast) {
      return; //se um mesmo toast já esta sendo exibido ele retorna nada
    }

    if (toasts.value.length > 2) {
      const oldestToast = toasts.value[0]; //toast antigo, primeiro indice igual a 0, o primeiro
      removeToast(oldestToast.id); //remove o primeiro toast(indice 0) para adicionar o próximo
    }

    const id = ++toastIdCounter; //adiciona toast na tela

    toasts.value.push({
      id,
      message,
      type,
      duration
    });

    // remove o toast automaticamente após a duração de 3seg
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

  const showWarning = (message: string, duration?: number) => {
    addToast(message, 'warning', duration);
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showWarning
  };
}