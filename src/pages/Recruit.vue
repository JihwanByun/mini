<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">직업훈련 정보</h1>
  
      <ul v-if="trainings.length > 0">
        <li
          v-for="item in trainings"
          :key="item.fxnum || item.title"
          class="mb-4 border p-2 rounded"
        >
          <h2 class="font-semibold text-lg">{{ item.title }}</h2>
          <p><strong>훈련기관:</strong> {{ item.subTitle }}</p>
          <p><strong>훈련기간:</strong> {{ item.traStartDate }} ~ {{ item.traEndDate }}</p>
          <p><strong>지역:</strong> {{ item.address }}</p>
        </li>
      </ul>
  
      <p v-else>훈련 정보를 불러오는 중입니다...</p>
    </div>
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
  