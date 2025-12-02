<script setup lang="ts">
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import { ref, watch } from 'vue'
import type { Task, Stage } from '~/composables/types' 
import { useTasksStore } from '~/composables/stores/useTasksStore'

const props = defineProps<{ stage: Stage, tasks: Task[] }>()
const emit = defineEmits(['update-list'])
const store = useTasksStore()

const localTasks = ref<Task[]>([])
watch(() => props.tasks, v => {
    localTasks.value = JSON.parse(JSON.stringify(v || []))
}, { immediate: true, deep: true })

function onChange(e: any) {
    // When a task is moved to a new column, the 'added' event is triggered in the new column.
    // The task element still has its old 'stage' property.
    if (e.added) {
        e.added.element.stage = props.stage
    }
    emit('update-list', localTasks.value)
}
</script>
<template>
  <div class="rounded-lg shadow-lg" :class="store?.stageColors[stage].bg">
    <div class="flex justify-between items-center mb-3 p-3 border-b-4" :class="store?.stageColors[stage].border">
        <h3 class="font-medium text-lg">{{ store?.stageTitles[stage] }}</h3>
        <span class="text-sm text-slate-500 font-semibold">{{ tasks ? tasks.length : 0 }}</span>
    </div>
    <div class="p-3">
        <draggable v-model="localTasks" group="tasks" item-key="id" @change="onChange" class="space-y-3">
          <template #item="{element}"><TaskCard :task="element" /></template>
        </draggable>
        <div v-if="!tasks || tasks.length===0" class="mt-4 text-sm text-slate-500 text-center">No tasks in this stage.</div>
    </div>
  </div>
</template>
