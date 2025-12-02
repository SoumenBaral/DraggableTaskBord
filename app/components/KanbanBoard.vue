
<script setup>
import { useTasksStore } from "~/composables/stores/useTasksStore";
import KanbanColumn from "./KanbanColumn.vue";

const store = useTasksStore();

function updateStage(stage, newList) {
  store.tasks[stage] = newList;
}
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <KanbanColumn
        v-for="stage in store?.stages"
        :key="stage"
        :stage="stage"
        :tasks="store?.tasks[stage]"
        @update-list="updateStage(stage, $event)"
      />
    </div>
  </div>
</template>

