<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-extrabold text-center text-[#3B3B3B] mb-6">
      오늘의 직업훈련 정보
    </h1>

    <div v-if="trainings.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in trainings"
        :key="item.fxnum || item.title"
        class="bg-[#f1ede8] border border-[#d6ccc2] rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:bg-[#e3dcd5]"
      >
        <h2 class="text-lg font-semibold text-[#4a4a4a] mb-2">
          {{ item.title }}
        </h2>

        <p class="text-sm text-[#555] mb-1">
          <span class="font-medium text-[#888]">기관:</span> {{ item.subTitle }}
        </p>

        <p class="text-sm text-[#555] mb-1">
          <span class="font-medium text-[#888]">기간:</span>
          <span class="text-green-600">{{ item.traStartDate }}</span>
          ~
          <span class="text-red-500">{{ item.traEndDate }}</span>
        </p>

        <p class="text-sm text-[#555]">
          <span class="font-medium text-[#888]">지역:</span> {{ item.address }}
        </p>
      </div>
    </div>

    <p v-else class="text-center text-gray-400 mt-10">
      ⏳ 훈련 정보를 불러오는 중입니다...
    </p>
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
</script>
