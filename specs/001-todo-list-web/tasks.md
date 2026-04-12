# Tasks: TODO List Web Application

**Input**: Design documents from `/specs/001-todo-list-web/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/task-service.md

**Tests**: Tests are included per Constitution Principle II (TDD mandatory).

**Organization**: Tasks are organized by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Vue 3 + TypeScript project with Vite (`npm create vue@latest`)
- [x] T002 [P] Configure ESLint for TypeScript + Vue in `.eslintrc.cjs`
- [x] T003 [P] Configure Prettier in `.prettierrc`
- [x] T004 [P] Configure Vitest in `vitest.config.ts`
- [x] T005 [P] Install Vue Test Utils and jsdom dependency
- [x] T006 Create project directory structure (`src/types/`, `src/services/`, `src/composables/`, `src/components/`, `tests/unit/`, `tests/components/`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 [P] Define Task interface and TaskStatus enum in `src/types/task.ts`
- [x] T008 [P] Define ValidationError and NotFoundError custom error classes in `src/types/errors.ts`
- [x] T009 [P] Write contract tests for taskStorage service in `tests/unit/services/taskStorage.test.ts`
- [x] T010 Implement taskStorage service (CRUD + localStorage) in `src/services/taskStorage.ts`
- [x] T011 Write unit tests for useTasks composable in `tests/unit/composables/useTasks.test.ts`
- [x] T012 Implement useTasks composable (reactive state management) in `src/composables/useTasks.ts`
- [x] T013 Create base App.vue with Russian UI text in `src/App.vue`
- [x] T014 Create main.ts entry point with Vue app initialization in `src/main.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Просмотр и отметка выполнения задач (Priority: P1) 🎯 MVP

**Goal**: Пользователь видит список активных задач и может отмечать их как выполненные

**Independent Test**: Открыть приложение → увидеть список задач → отметить задачу выполненной → задача исчезает из списка

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T015 [P] [US1] Test: TaskList renders empty state message in `tests/components/TaskList.test.ts`
- [x] T016 [P] [US1] Test: TaskList renders list of active tasks in `tests/components/TaskList.test.ts`
- [x] T017 [P] [US1] Test: TaskItem displays title and description in `tests/components/TaskItem.test.ts`
- [x] T018 [US1] Test: TaskItem «Выполнено» button calls completeTask in `tests/components/TaskItem.test.ts`

### Implementation for User Story 1

- [x] T019 [P] [US1] Create TaskItem component (display + complete button) in `src/components/TaskItem.vue`
- [x] T020 [P] [US1] Create TaskList component (list + empty state) in `src/components/TaskList.vue`
- [x] T021 [US1] Integrate TaskList into App.vue with useTasks composable in `src/App.vue`
- [x] T022 [US1] Add basic CSS styling for TaskList and TaskItem in component `<style>` blocks
- [x] T023 [US1] Add Russian UI labels and empty-state message

**Checkpoint**: At this point, user can open app, see tasks, and mark them complete

---

## Phase 4: User Story 2 — Создание новой задачи (Priority: P1)

**Goal**: Пользователь создаёт задачу с заголовком и описанием, она появляется в списке

**Independent Test**: Заполнить форму → нажать «Создать» → задача появляется в списке активных

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T024 [P] [US2] Test: TaskForm creates task with title + description in `tests/components/TaskForm.test.ts`
- [x] T025 [P] [US2] Test: TaskForm rejects empty title in `tests/components/TaskForm.test.ts`
- [x] T026 [US2] Test: TaskForm allows empty description in `tests/components/TaskForm.test.ts`

### Implementation for User Story 2

- [x] T027 [P] [US2] Create TaskForm component (title input, description textarea, create button) in `src/components/TaskForm.vue`
- [x] T028 [US2] Implement form validation (empty title, trim whitespace) in `src/components/TaskForm.vue`
- [x] T029 [US2] Connect TaskForm to useTasks.createTask in `src/components/TaskForm.vue`
- [x] T030 [US2] Integrate TaskForm into App.vue above TaskList in `src/App.vue`
- [x] T031 [US2] Add Russian validation error messages

**Checkpoint**: At this point, MVP is complete — create, view, and complete tasks

---

## Phase 5: User Story 3 — Редактирование задачи (Priority: P2)

**Goal**: Пользователь может изменить заголовок и/или описание существующей задачи

**Independent Test**: Нажать «Редактировать» на задаче → изменить заголовок → сохранить → изменения видны в списке

### Tests for User Story 3

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T032 [P] [US3] Test: TaskForm edit mode populates fields with existing values in `tests/components/TaskForm.test.ts`
- [x] T033 [P] [US3] Test: TaskForm edit rejects empty title in `tests/components/TaskForm.test.ts`
- [x] T034 [US3] Test: TaskItem edit button toggles TaskForm edit mode in `tests/components/TaskItem-edit.test.ts`

### Implementation for User Story 3

- [x] T035 [P] [US3] Add edit mode to TaskForm (pre-fill fields, update instead of create) in `src/components/TaskForm.vue`
- [x] T036 [P] [US3] Add «Редактировать» button to TaskItem component in `src/components/TaskItem.vue`
- [x] T037 [US3] Connect edit mode to useTasks.updateTask in `src/App.vue`
- [x] T038 [US3] Add Russian labels for edit UI and validation messages

**Checkpoint**: At this point, US1 + US2 + US3 all work independently

---

## Phase 6: User Story 4 — Архивирование задач (Priority: P3)

**Goal**: Пользователь может архивировать задачи и просматривать/восстанавливать архивные

**Independent Test**: Архивировать задачу → исчезает из основного списка → появляется в архиве → восстановить → возвращается

### Tests for User Story 4

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T039 [P] [US4] Test: ArchiveView displays archived tasks in `tests/components/ArchiveView.test.ts`
- [x] T040 [P] [US4] Test: ArchiveView restore button calls restoreTask in `tests/components/ArchiveView.test.ts`
- [x] T041 [P] [US4] Test: TaskItem archive button calls archiveTask in `tests/components/TaskItem.test.ts`

### Implementation for User Story 4

- [x] T042 [P] [US4] Add «Архивировать» button to TaskItem component in `src/components/TaskItem.vue`
- [x] T043 [P] [US4] Create ArchiveView component (list of archived tasks + restore) in `src/components/ArchiveView.vue`
- [x] T044 [US4] Add archive toggle/tab to App.vue with ArchiveView integration in `src/App.vue`
- [x] T045 [US4] Add Russian labels for archive UI («Архив», «Восстановить», «Архивировать»)

**Checkpoint**: All user stories are now independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T046 [P] Add XSS sanitization review for all user inputs
- [x] T047 [P] Add responsive CSS for basic mobile readability in component `<style>` blocks
- [x] T048 [P] Add README.md with quickstart instructions
- [x] T049 Run full test suite and fix any failures
- [x] T050 Run linter and fix all warnings
- [x] T051 Verify all Russian text in UI is grammatically correct

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) — Depends on US1 components for integration
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) — Reuses TaskForm from US2
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) — Reuses TaskItem from US1

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Components before integration into App.vue
- Core implementation before polish

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002–T005)
- All Foundational tasks marked [P] can run in parallel (T007–T009)
- Tests within a user story marked [P] can run in parallel
- Components within a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "T015 - TaskList empty state test"
Task: "T016 - TaskList render test"
Task: "T017 - TaskItem display test"

# Launch all components for User Story 1 together:
Task: "T019 - TaskItem component"
Task: "T020 - TaskList component"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (view + complete)
4. Complete Phase 4: User Story 2 (create)
5. **STOP and VALIDATE**: Test create → view → complete flow
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (view + complete) → Test independently
3. Add US2 (create) → Test independently → MVP!
4. Add US3 (edit) → Test independently
5. Add US4 (archive) → Test independently → Full feature set!
6. Polish → Lint, XSS review, README

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (view + complete)
   - Developer B: User Story 2 (create) — after US1 components ready
3. US3 and US4 can proceed in parallel after US1/US2

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 51 |
| **Setup (Phase 1)** | 6 |
| **Foundational (Phase 2)** | 8 |
| **US1 — Просмотр/Выполнение (P1)** | 9 |
| **US2 — Создание (P1)** | 8 |
| **US3 — Редактирование (P2)** | 7 |
| **US4 — Архивирование (P3)** | 7 |
| **Polish (Phase 7)** | 6 |
| **Parallel opportunities** | T002–T005, T007–T009, T015–T017, T019–T020, T024–T026, T032–T034, T035–T036, T039–T041, T046–T048 |

**MVP scope**: Phases 1–4 (Tasks T001–T031) — create, view, and complete tasks
