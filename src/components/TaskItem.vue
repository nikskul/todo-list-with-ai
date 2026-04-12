<template>
  <div class="task-item" :class="{ 'task-item--completed': task.status === 'completed' }">
    <div class="task-item__content">
      <h3 class="task-item__title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-item__description">{{ task.description }}</p>
    </div>
    <div class="task-item__actions">
      <button class="task-item__btn task-item__btn--complete" @click="$emit('complete', task.id)">
        Выполнено
      </button>
      <button class="task-item__btn task-item__btn--edit" @click="$emit('edit', task)">
        Редактировать
      </button>
      <button class="task-item__btn task-item__btn--archive" @click="$emit('archive', task.id)">
        Архивировать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
  task: Task
}>()

defineEmits<{
  complete: [id: string]
  edit: [task: Task]
  archive: [id: string]
}>()
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #fff;
}

.task-item--completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.task-item__content {
  flex: 1;
  margin-right: 12px;
}

.task-item__title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
}

.task-item__description {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.task-item__actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.task-item__btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;
  white-space: nowrap;
}

.task-item__btn--complete {
  background: #4caf50;
}

.task-item__btn--complete:hover {
  background: #388e3c;
}

.task-item__btn--edit {
  background: #2196f3;
}

.task-item__btn--edit:hover {
  background: #1976d2;
}

.task-item__btn--archive {
  background: #ff9800;
}

.task-item__btn--archive:hover {
  background: #f57c00;
}
</style>
