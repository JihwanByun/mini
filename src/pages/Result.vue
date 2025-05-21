<template>
  <header
    class="w-full h-[60px] bg-[#3B3B3B] flex items-center justify-center text-white text-[20px] font-[800]"
  >
    대학 별 취업현황
  </header>

  <div class="w-full bg-white flex flex-col items-center mt-4">
    <!-- 대학명 검색창 -->
    <input
      v-model="schoolQuery"
      placeholder="대학명 검색"
      class="w-[300px] p-2 rounded border border-gray-300 mb-4"
      @keyup.enter="applySchoolQuery"
    />

    <!-- 단과대학명 검색창 -->
    <input
      v-model="majorQuery"
      placeholder="단과대학명 검색"
      class="w-[300px] p-2 rounded border border-gray-300 mb-4"
      @keyup.enter="applyMajorQuery"
    />
    <Weather class="absolute top-[0px] right-[0px]" />

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
