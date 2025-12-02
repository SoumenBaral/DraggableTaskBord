<script setup>
import { useModal } from '~/composables/useModal'
import AddTaskModel from '~/components/AddTaskModel.vue';

const { showModal, taskToEdit, closeModal } = useModal()

function onSearch(query) {
  // a real implementation would filter tasks in the store
  console.log('searching for', query)
}
</script>

<template>
    <Header @search="onSearch"/>
    <slot />
    <AddTaskModel v-if="showModal" :task="taskToEdit" @close="closeModal" />
</template>