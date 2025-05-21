<template>
  <div class="min-h-screen bg-white flex flex-col">
    <header
      class="w-full h-[60px] bg-[#3B3B3B] flex items-center justify-center text-[20px] text-white font-[800]"
    >
      상세 정보
    </header>
    <Weather class="absolute top-[0px] right-[0px]" />
    <main
      class="flex items-center justify-center"
      :style="{ minHeight: 'calc(100vh - 60px)' }"
    >
      <div v-if="loading" class="text-center mt-20 text-gray-600"></div>

      <div
        v-else-if="schoolData"
        class="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-md text-gray-800"
        style="box-shadow: 0 4px 12px rgb(13, 148, 136)"
      >
        <h2 class="text-2xl font-bold mb-6 text-teal-900">
          {{ schoolData.SCHOOL_NM.replace(/_/g, " ") }} ({{
            schoolData.STD_YY
          }}년도)
        </h2>

        <div class="flex flex-col gap-4 text-gray-700">
          <div class="flex justify-between">
            <span class="">학교 종류명:</span>
            <span class="font-extrabold">{{ schoolData.SCHOOL_KIND_NM }}</span>
          </div>
          <div class="flex justify-between">
            <span class="">설립 구분명:</span>
            <span class="font-extrabold">{{ schoolData.FOUND_DIV_NM }}</span>
          </div>
          <div class="flex justify-between">
            <span class="">단과대학명:</span>
            <span class="font-extrabold">{{
              schoolData.COLGE_UNIV_NM || "없음"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="">학과명(전공):</span>
            <span class="font-extrabold">{{
              schoolData.MJR_NM.replace(/\(.*\)/, "") || "없음"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="">남자 졸업자 수:</span>
            <span class="font-extrabold">{{ schoolData.MALE_GRA_CNT }}</span>
          </div>
          <div class="flex justify-between">
            <span class="">여자 졸업자 수:</span>
            <span class="font-extrabold">{{ schoolData.FEMALE_GRA_CNT }}</span>
          </div>
          <div class="flex justify-between">
            <span>건강보험 연계 취업자 수:</span>
            <span class="font-extrabold">{{
              Number(schoolData.HTIR_CONCTN_MALE_EMPLYE_CNT) +
                Number(schoolData.HTIR_CONCTN_FEMALE_EMPLYE_CNT) || 0
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>취업률:</span
            ><span class="font-extrabold">{{ schoolData.EMPLYMT_RT }}%</span>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-20 text-red-600">
        데이터가 존재하지 않습니다.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useDataStore } from "../stores/dataStore";
import Weather from "../components/Weather.vue";

const route = useRoute();
const store = useDataStore();

const schoolName = route.query.school || "";
const majorName = route.query.major || "";

const normalize = (str) =>
  (str || "").toLowerCase().replace(/\s/g, "").replace(/_/g, "");

const schoolData = computed(() => {
  return store.datas.find((item) => {
    const schoolMatch = normalize(item.SCHOOL_NM) === normalize(schoolName);
    const majorMatch = majorName
      ? normalize(item.MJR_NM) === normalize(majorName)
      : true;
    return schoolMatch && majorMatch;
  });
});

onMounted(async () => {
  if (store.datas.length === 0) {
    await store.fetchDatas();
  }
});
</script>
