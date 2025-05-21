<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
      📚 오늘의 직업훈련 정보
    </h1>

    <div v-if="trainings.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="item in trainings"
        :key="item.fxnum || item.title"
        class="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-lg font-semibold text-blue-700 mb-2">{{ item.title }}</h2>
        <p class="text-sm text-gray-700 mb-1">
          <strong class="text-gray-500">훈련기관:</strong> {{ item.subTitle }}
        </p>
        <p class="text-sm text-gray-700 mb-1">
          <strong class="text-gray-500">훈련기간:</strong>
          <span class="text-green-600 font-medium">{{ item.traStartDate }}</span> ~
          <span class="text-red-600 font-medium">{{ item.traEndDate }}</span>
        </p>
        <p class="text-sm text-gray-700">
          <strong class="text-gray-500">지역:</strong> {{ item.address }}
        </p>
      </div>
    </div>

    <p v-else class="text-center text-gray-600 mt-10">훈련 정보를 불러오는 중입니다...</p>
  </div>
</template>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { fetchTrainingList } from '../api/work24.js'
  
  const trainings = ref([])
  
  onMounted(async () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  trainings.value = await fetchTrainingList({
    srchTraStDt: today,
  })
})

  console.log(trainings.value)
  </script>
  