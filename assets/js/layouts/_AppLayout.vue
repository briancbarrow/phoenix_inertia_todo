<script setup></script>
<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-blue-600">TodoApp</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <a
                href="#"
                class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Tasks
              </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Team
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="relative inline-block">
                <img
                  class="h-8 w-8 rounded-full"
                  src="/api/placeholder/32/32"
                  alt="User profile"
                />
                <span
                  class="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <main>
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
