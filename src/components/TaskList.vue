<template>
  <div class="task-list">
    <p v-if="tasks.length === 0" class="task-list__empty">
      Задач пока нет. Создайте первую!
    </p>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="$emit('complete', $event)"
      @edit="$emit('edit', $event)"
      @archive="$emit('archive', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskItem from './TaskItem.vue'

defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  complete: [id: string]
  edit: [task: Task]
  archive: [id: string]
}>()
</script>

<style scoped>
.task-list__empty {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 32px 0;
}
</style>
