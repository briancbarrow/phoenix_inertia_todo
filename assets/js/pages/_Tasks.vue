<script setup>
import { Inertia } from "@inertiajs/inertia";
import TaskItem from "./TaskItem.vue";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  users: {
    type: Array,
    required: true,
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

const filteredTasks = computed(() => {
  switch (props.currentFilter) {
    case "active":
      return props.tasks.filter((task) => !task.completed);
    case "completed":
      return props.tasks.filter((task) => task.completed);
    default:
      return props.tasks;
  }
});

const taskCount = computed(() => {
  return props.tasks.length;
});

function createTask() {
  Inertia.post("/tasks", {
    task: {
      title: newTask.title,
      description: newTask.description,
      completed: false,
    },
  });
}

function toggleTask(task) {
  Inertia.patch(`/tasks/${task.id}`, {
    task: {
      completed: !task.completed,
    },
  });
}
function deleteTask(task) {
  if (confirm("Are you sure you want to delete this task?")) {
    Inertia.delete(`/tasks/${task.id}`);
  }
}
function editTask(task) {
  Inertia.patch(`/tasks/${task.id}`, {
    task: {
      title: task.title,
      description: task.description,
    },
  });
}

const newTask = ref({
  title: "",
  description: "",
  completed: false,
});

const currentFilter = ref("all");

// data() {
//   return {

//     currentFilter: "all",
//     filters: [
//       { label: "All", value: "all" },
//       { label: "Active", value: "active" },
//       { label: "Completed", value: "completed" },
//     ],
//     activeUsers: [],
//     channel: null,
//   };
// },
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold mb-6">Todo App</h1>

    <!-- New Task Form -->
    <form @submit.prevent="createTask" class="mb-8">
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            v-model="newTask.title"
            type="text"
            placeholder="Add a new task..."
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
    </form>

    <!-- Filters -->
    <div class="flex justify-center space-x-4 mb-6">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="currentFilter = filter.value"
        :class="[
          'px-3 py-1 rounded',
          currentFilter === filter.value
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300',
        ]"
      >
        {{ filter.label }} ({{ filteredTasksCount(filter.value) }})
      </button>
    </div>

    <!-- Task List -->
    <div v-if="filteredTasks.length > 0">
      <draggable
        v-model="filteredTasks"
        group="tasks"
        @end="handleDragEnd"
        item-key="id"
        class="space-y-2"
      >
        <template #item="{ element: task }">
          <task-item
            :task="task"
            @toggle="toggleTask"
            @delete="deleteTask"
            @edit="editTask"
            @assign="assignTask"
          />
        </template>
      </draggable>
    </div>
    <div v-else class="text-center text-gray-500 py-8">No tasks to display</div>

    <!-- Collaboration Info -->
    <div class="mt-8 pt-4 border-t border-gray-200">
      <h3 class="text-sm font-medium text-gray-500">Currently editing:</h3>
      <div class="flex space-x-2 mt-2">
        <div
          v-for="user in activeUsers"
          :key="user.id"
          class="w-8 h-8 rounded-full flex items-center justify-center text-white"
          :style="{ backgroundColor: user.color }"
        >
          {{ user.initials }}
        </div>
      </div>
    </div>
  </div>
</template>
