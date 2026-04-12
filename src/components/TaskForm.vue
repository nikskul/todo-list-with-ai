<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <div class="task-form__field">
      <label for="task-title" class="task-form__label">Заголовок</label>
      <input
        id="task-title"
        v-model="form.title"
        class="task-form__input"
        type="text"
        placeholder="Введите заголовок"
        maxlength="200"
      />
      <span v-if="error" class="task-form__error">{{ error }}</span>
    </div>
    <div class="task-form__field">
      <label for="task-description" class="task-form__label">Описание</label>
      <textarea
        id="task-description"
        v-model="form.description"
        class="task-form__textarea"
        placeholder="Введите описание (необязательно)"
        maxlength="2000"
        rows="3"
      />
    </div>
    <button type="submit" class="task-form__submit">
      {{ isEdit ? 'Сохранить' : 'Создать' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task'

const props = withDefaults(
  defineProps<{
    task?: Task | null
    isEdit?: boolean
  }>(),
  {
    task: null,
    isEdit: false,
  }
)

const emit = defineEmits<{
  create: [input: CreateTaskInput]
  update: [id: string, input: UpdateTaskInput]
  cancel: []
}>()

const form = reactive({
  title: '',
  description: '',
})

const error = ref('')

// При переключении на режим редактирования заполняем поля
watch(
  () => props.task,
  (newTask) => {
    if (newTask && props.isEdit) {
      form.title = newTask.title
      form.description = newTask.description
    }
  },
  { immediate: true }
)

function handleSubmit(): void {
  error.value = ''

  const trimmedTitle = form.title.trim()
  if (!trimmedTitle) {
    error.value = 'Заголовок не может быть пустым'
    return
  }

  if (props.isEdit && props.task) {
    emit('update', props.task.id, {
      title: trimmedTitle,
      description: form.description,
    })
  } else {
    emit('create', {
      title: trimmedTitle,
      description: form.description,
    })
  }

  // Очистить форму после отправки
  form.title = ''
  form.description = ''
}
</script>

<style scoped>
.task-form {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.task-form__field {
  margin-bottom: 12px;
}

.task-form__label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.task-form__input,
.task-form__textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
}

.task-form__input:focus,
.task-form__textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.task-form__textarea {
  resize: vertical;
  min-height: 60px;
}

.task-form__error {
  display: block;
  color: #e53935;
  font-size: 13px;
  margin-top: 4px;
}

.task-form__submit {
  width: 100%;
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

.task-form__submit:hover {
  background: #388e3c;
}
</style>
