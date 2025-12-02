import { onMounted, watch } from "vue";
import { useTasksStore } from "~/composables/stores/useTasksStore";

const KEY = 'intern_task';

export function usePersistTask() {
  const store = useTasksStore();

  onMounted(() => {
    if (process.client) {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        try {
          store.setTasks(JSON.parse(raw));
        } catch { }
      }
    }

    watch(
      () => store.tasks,
      (v) => {
        try {
          localStorage.setItem(KEY, JSON.stringify(v));
        } catch { }
      },
      { deep: true } 
    );
  });
}
