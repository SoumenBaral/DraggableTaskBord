import { ref } from 'vue'
import type { Task } from './types'

const showModal = ref(false)
const taskToEdit = ref<Task | null>(null)

export function useModal() {
    function openModal(task: Task | null = null) {
        taskToEdit.value = task
        showModal.value = true
    }

    function closeModal() {
        showModal.value = false
        taskToEdit.value = null
    }

    return {
        showModal,
        taskToEdit,
        openModal,
        closeModal
    }
}
