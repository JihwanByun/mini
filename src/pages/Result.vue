<template>
  <header
    class="w-full h-[60px] bg-[#3B3B3B] flex items-center justify-center text-white text-[20px] font-[800]"
  >
    대학별 취업현황
  </header>

  <div class="w-full bg-white flex flex-col items-center mt-4">
    <!-- 가로 정렬 검색창 (배경, 테두리 없음) -->
    <div
      class="w-full max-w-[1000px] flex flex-col md:flex-row justify-center gap-4 mb-8"
    >
      <!-- 대학명 검색 -->
      <div class="relative flex-1 max-w-[400px] group">
        <input
          v-model="schoolQuery"
          placeholder="대학명 검색"
          class="peer w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm transition focus:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800"
          @keyup.enter="applySchoolQuery"
        />
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition peer-focus:text-teal-600"
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
      <div class="relative flex-1 max-w-[400px] group">
        <input
          v-model="majorQuery"
          placeholder="단과대학명 검색"
          class="peer w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm transition focus:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800"
          @keyup.enter="applyMajorQuery"
        />
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition peer-focus:text-teal-600"
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
        내일배움캠프 보기
      </router-link>
    </div>

    <Weather class="absolute top-[0px] right-[0px]" />

    <!-- 데이터 카드 -->
    <router-link
      v-for="data in filteredDatas"
      :key="data.SCHOOL_NM + data.MJR_NM"
      :to="{
        path: '/detail',
        query: { school: data.SCHOOL_NM, major: data.MJR_NM },
      }"
      class="block w-full max-w-[1000px] bg-white border border-gray-200 mb-[37px] rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.01]"
      style="box-shadow: 0 4px 12px rgb(13, 148, 136)"
    >
      <!-- 헤더 -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-semibold text-teal-800">
          {{ data.SCHOOL_NM.replace(/_/g, " ") }}
        </h2>
        <span class="text-sm text-gray-500">{{ data.STD_YY }}년도</span>
      </div>

      <!-- 본문 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-base"
      >
        <div>
          <span class="font-medium text-gray-600">단과대학명:</span>
          <span class="ml-1 font-extrabold">{{
            data.MJR_NM.replace(/\(.*\)/, "") || "없음"
          }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-600">설립 구분:</span>
          <span class="ml-1">{{ data.FOUND_DIV_NM }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-600">총 졸업자 수:</span>
          <span class="ml-1 font-extrabold">{{
            data.MALE_GRA_CNT + data.FEMALE_GRA_CNT
          }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-600">취업률:</span>
          <span class="ml-1 text-blue-500 font-extrabold">
            {{ data.EMPLYMT_RT }}%
          </span>
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
