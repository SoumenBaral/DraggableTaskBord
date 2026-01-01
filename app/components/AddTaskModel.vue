<script setup lang="ts">
import { reactive } from 'vue'
import { useTasksStore, type Task } from '~/composables/stores/useTasksStore'
const props = defineProps<{ task?: Task | null }>()
const emit = defineEmits(['close'])
const store = useTasksStore()
const form = reactive({
  title: props.task?.title || '',
  assignee: props.task?.assignee || '',
  stage: props.task?.stage || 'backlog'
})
function save(){
  if(props.task) store?.updateTask(props.task.id, { title: form.title, assignee: form.assignee, stage: form.stage })
  else store?.addTask({ title: form.title, assignee: form.assignee, stage: form.stage as any })
  emit('close') 
}
</script>
<template>   
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-blue-50 border-b-4 border-l-2 border-blue-500 rounded-2xl p-4 w-full max-w-md">
      <h3 class="text-lg font-medium mb-3">{{ task ? 'Edit Task' : 'Add Task' }}</h3>
      <form @submit.prevent="save">
        <input v-model="form.title" required placeholder="Title" class="w-full border rounded px-3 py-2 mb-2" />
        <input v-model="form.assignee" placeholder="Assignee" class="w-full border rounded px-3 py-2 mb-2" />
        <select v-model="form.stage" class="w-full border rounded px-3 py-2 mb-4">
          <option value="backlog">Backlog</option>
          <option value="inprogress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <div class="flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="px-3 py-2 shadow rounded border">Cancel</button>
          <button type="submit" class="px-6 py-2 rounded bg-sky-600 shadow text-white">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

