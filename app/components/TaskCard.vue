<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '~/composables/types'
import { useTasksStore } from '~/composables/stores/useTasksStore'
import { useModal } from '~/composables/useModal'

const props = defineProps<{ task: Task }>()
const store = useTasksStore()
const { openModal } = useModal()

const date = computed(()=> new Date(props.task?.createdAt).toLocaleDateString())

function deleteTask() {
  if (confirm('Are you sure you want to delete this task?')) {
    store?.deleteTask(props.task.id)
  }
}
</script>
<template>
  <div 
    v-motion
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    }"
    class="bg-white p-3 rounded-lg shadow-md hover:shadow-xl cursor-grab" 
    :data-id="task.id"
  >
    <div class="flex justify-between items-center">
      <div class="font-medium text-base">{{ task.title }}</div>
      <div class="text-xs text-slate-400">{{ date }}</div>
    </div>
    <div class="mt-2 text-sm text-slate-600">{{ task.assignee || 'Unassigned' }}</div>
    <div class="mt-3 flex justify-end gap-2 items-center">
        <button @click="openModal(task)" class="text-xs font-bold text-sky-600 hover:text-sky-800">EDIT</button>
        <button @click="deleteTask" class="text-xs font-bold text-red-600 hover:text-red-800">DELETE</button>
    </div>
  </div>
</template>
