import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Task, Stage } from '~/composables/types';

export const useTasksStore = defineStore("tasks", () => {
  const stages: Stage[] = ["backlog", "inprogress", "review", "done"];

  const tasks = ref<Record<Stage, Task[]>>(
    process.client
      ? JSON.parse(localStorage.getItem("intern-tasks") || "{}")
      : { backlog: [], inprogress: [], review: [], done: [] }
  );

  // Initialize empty arrays for stages if they don't exist
  stages.forEach(stage => {
    if (!tasks.value[stage]) tasks.value[stage] = [];
  });

  if (process.client) {
    watch(
      tasks,
      (val) => {
        localStorage.setItem("intern-tasks", JSON.stringify(val));
      },
      { deep: true }
    );
  }

  function addTask(task: Pick<Task, 'title' | 'assignee' | 'stage'>) {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    tasks.value[task.stage].push(newTask);
  }

  function updateTask(id: string, updatedTask: Partial<Task>) {
    for (const stage of stages) {
      const taskIndex = tasks.value[stage].findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        const originalTask = tasks.value[stage][taskIndex];
        tasks.value[stage][taskIndex] = { ...originalTask, ...updatedTask, updatedAt: Date.now() };
        if (updatedTask.stage && updatedTask.stage !== stage) {
          moveTask(id, updatedTask.stage);
        }
        return;
      }
    }
  }

  function moveTask(id: string, to: Stage) {
    for (const stage of stages) {
      const taskIndex = tasks.value[stage].findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        const [task] = tasks.value[stage].splice(taskIndex, 1);
        task.stage = to;
        task.updatedAt = Date.now();
        tasks.value[to].push(task);
        return;
      }
    }
  }

  function deleteTask(id: string) {
    for (const stage of stages) {
        const taskIndex = tasks.value[stage].findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks.value[stage].splice(taskIndex, 1);
            return;
        }
    }
  }
  
  const stageTitles: Record<Stage, string> = {
    backlog: 'Backlog',
    inprogress: 'In Progress',
    review: 'Review',
    done: 'Done'
  }

  const stageColors: Record<Stage, { border: string, bg: string }> = {
    backlog: { border: 'border-slate-400', bg: 'bg-slate-400/10' },
    inprogress: { border: 'border-sky-400', bg: 'bg-sky-400/10' },
    review: { border: 'border-amber-400', bg: 'bg-amber-400/10' },
    done: { border: 'border-emerald-400', bg: 'bg-emerald-400/10' }
  }


  return { stages, tasks, addTask, updateTask, moveTask, stageTitles, deleteTask, stageColors };
});
