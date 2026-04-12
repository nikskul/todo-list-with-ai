<template>
  <div class="archive-view">
    <h2 class="archive-view__title">Архив</h2>
    <p v-if="tasks.length === 0" class="archive-view__empty">
      Архив пуст
    </p>
    <div v-for="task in tasks" :key="task.id" class="archive-view__item">
      <div class="archive-view__info">
        <strong>{{ task.title }}</strong>
        <span v-if="task.description" class="archive-view__desc">{{ task.description }}</span>
      </div>
      <button class="archive-view__btn" @click="$emit('restore', task.id)">
        Восстановить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  restore: [id: string]
}>()
</script>

<style scoped>
.archive-view {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.archive-view__title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
  color: #555;
}

.archive-view__empty {
  text-align: center;
  color: #999;
  padding: 16px 0;
}

.archive-view__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fafafa;
}

.archive-view__info {
  flex: 1;
  margin-right: 12px;
}

.archive-view__desc {
  display: block;
  color: #666;
  font-size: 13px;
  margin-top: 2px;
}

.archive-view__btn {
  padding: 6px 12px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  flex-shrink: 0;
}

.archive-view__btn:hover {
  background: #1976d2;
}
</style>
