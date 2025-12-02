<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { useModal } from '~/composables/useModal'

    const emit = defineEmits(['search'])
    const query = ref('')
    const isMenuOpen = ref(false)
    watch(query, () => emit('search', query.value))
    
    const { openModal } = useModal()
</script>
<template>
    <header class="bg-gray-50 shadow-lg sticky top-0 z-10">
        <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                    <img class="w-10 h-10" src="assets/image/logo.jpg" alt="" srcset="">
                    <h1 class="text-lg font-semibold">Intern Task Board</h1>
                </div>
                <nav>
                    <NuxtLink to="/" class="text-sm font-medium text-gray-700 hover:text-sky-600">Kanban Board</NuxtLink>
                </nav>
            </div>
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-2">
                <input v-model="query" placeholder="Search tasks..." class="px-3 py-1 border rounded-md text-sm" />
                <button @click="openModal()" class="px-3 py-1 bg-emerald-500 text-white rounded-md text-sm">New Task</button>
            </div>
            <!-- Mobile Menu Button -->
            <div class="md:hidden">
                <button @click="isMenuOpen = !isMenuOpen" class="text-gray-800 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden px-4 pt-2 pb-4 space-y-2">
            <input v-model="query" placeholder="Search tasks..." class="w-full px-3 py-1 border rounded-md text-sm" />
            <button @click="openModal(); isMenuOpen = false" class="w-full px-3 py-1 bg-emerald-500 text-white rounded-md text-sm">New Task</button>
        </div>
    </header>
</template>
