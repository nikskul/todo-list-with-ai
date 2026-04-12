<template>
  <div id="app">
    <h1>Список задач</h1>

    <!-- Форма создания/редактирования -->
    <TaskForm
      v-if="editingTask"
      :task="editingTask"
      :is-edit="true"
      @update="handleUpdate"
      @cancel="editingTask = null"
    />
    <TaskForm v-else @create="createTask" />

    <!-- Список активных задач -->
    <TaskList
      :tasks="activeTasks"
      @complete="completeTask"
      @edit="startEdit"
      @archive="archiveTask"
    />

    <!-- Переключатель архива -->
    <button class="toggle-archive-btn" @click="showArchive = !showArchive">
      {{ showArchive ? 'Скрыть архив' : 'Показать архив' }}
    </button>

    <!-- Архив -->
    <ArchiveView v-if="showArchive" :tasks="archivedTasks" @restore="restoreTask" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import ArchiveView from '@/components/ArchiveView.vue'

const { activeTasks, archivedTasks, createTask, completeTask, archiveTask, restoreTask, updateTask } =
  useTasks()

const editingTask = ref<Task | null>(null)
const showArchive = ref(false)

function startEdit(task: Task): void {
  editingTask.value = task
}

function handleUpdate(id: string, input: UpdateTaskInput): void {
  updateTask(id, input)
  editingTask.value = null
}
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.toggle-archive-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 24px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.toggle-archive-btn:hover {
  background: #bdbdbd;
}
</style>
