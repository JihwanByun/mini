<template>
  <header
    class="w-full h-[60px] bg-[#3B3B3B] flex items-center justify-center text-white text-[20px] font-[800]"
  >
    대학 별 취업현황
  </header>

  <div class="w-full bg-white flex flex-col items-center mt-4">
    <!-- 가로 정렬 검색창 (배경, 테두리 없음) -->
    <div
      class="w-full max-w-[1000px] flex flex-col md:flex-row justify-center gap-4 mb-8"
    >
      <!-- 대학명 검색 -->
      <div class="relative flex-1 max-w-[400px]">
        <input
          v-model="schoolQuery"
          placeholder="대학명 검색"
          class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          @keyup.enter="applySchoolQuery"
        />
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>

      <!-- 단과대학 검색 -->
      <div class="relative flex-1 max-w-[400px]">
        <input
          v-model="majorQuery"
          placeholder="단과대학명 검색"
          class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
          @keyup.enter="applyMajorQuery"
        />
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>
      <!-- 버튼 추가 -->
      <router-link
        to="/jobs"
        class="inline-flex items-center gap-2 px-5 py-2 bg-teal-600 text-white font-semibold rounded-xl shadow hover:bg-teal-700 transition-all duration-300"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        페이지 이동
      </router-link>
    </div>

    <!-- 데이터 카드 -->
    <router-link
      v-for="data in filteredDatas"
      :key="data.SCHOOL_NM + data.MJR_NM"
      :to="{
        path: '/detail',
        query: { school: data.SCHOOL_NM, major: data.MJR_NM },
      }"
      class="w-[1000px] bg-[#e8dcca] border-0.3 shadow-md rounded-2xl p-4 my-4 flex flex-col gap-2 no-underline hover:bg-[#d0bca5] transition-colors duration-200"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">
          {{ data.SCHOOL_NM }}
        </h2>
        <span class="text-sm text-gray-500">{{ data.STD_YY }}년도</span>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-2 text-gray-700">
        <div>
          <span class="font-semibold">단과대학명:</span>
          <span class="ml-2">{{ data.MJR_NM || "없음" }}</span>
        </div>
        <div>
          <span class="font-semibold">설립 구분:</span>
          <span class="ml-2">{{ data.FOUND_DIV_NM }}</span>
        </div>
        <div>
          <span class="font-semibold">총 졸업자 수:</span>
          <span class="ml-2">
            {{ data.MALE_GRA_CNT + data.FEMALE_GRA_CNT }}
          </span>
        </div>
        <div>
          <span class="font-semibold">취업률:</span>
          <span class="ml-2">{{ data.EMPLYMT_RT }}%</span>
        </div>
      </div>
    </router-link>

    <p v-if="filteredDatas.length === 0" class="mt-10 text-gray-400">
      검색 결과가 없습니다.
    </p>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useDataStore } from "../stores/dataStore";
import { useRoute } from "vue-router";
import Weather from "../components/Weather.vue";

const store = useDataStore();
const route = useRoute();

// 초기 url 쿼리값
const initialQuery = route.query.q || "";

// 입력용
const schoolQuery = ref(initialQuery);
const majorQuery = ref("");

// 적용용
const appliedSchoolQuery = ref(initialQuery);
const appliedMajorQuery = ref("");

// Enter 입력 시 적용
function applySchoolQuery() {
  appliedSchoolQuery.value = schoolQuery.value.trim();
}
function applyMajorQuery() {
  appliedMajorQuery.value = majorQuery.value.trim();
}

onMounted(async () => {
  if (store.datas.length === 0) {
    await store.fetchDatas();
  }
});

const filteredDatas = computed(() => {
  return store.datas.filter((data) => {
    const schoolMatch = data.SCHOOL_NM?.toLowerCase().includes(
      appliedSchoolQuery.value.toLowerCase()
    );
    const majorMatch = data.MJR_NM?.toLowerCase().includes(
      appliedMajorQuery.value.toLowerCase()
    );
    return schoolMatch && (appliedMajorQuery.value === "" || majorMatch);
  });
});
</script>
