<template>
  <div class="min-h-screen bg-white flex flex-col">
    <header
      class="w-full h-[60px] bg-[#3B3B3B] flex items-center justify-center text-[20px] text-white font-[800]"
    >
      상세 정보
    </header>

    <main
      class="flex items-center justify-center"
      :style="{ minHeight: 'calc(100vh - 60px)' }"
    >
      <div v-if="loading" class="text-center mt-20 text-gray-600"></div>

      <div
        v-else-if="schoolData"
        class="w-full max-w-4xl bg-[#e8dcca] rounded-2xl p-6 shadow-md text-gray-800"
      >
        <h2 class="text-2xl font-bold mb-6 text-gray-700">
          {{ schoolData.SCHOOL_NM }} ({{ schoolData.STD_YY }}년도)
        </h2>

        <div class="flex flex-col gap-4 text-gray-700">
          <div class="flex justify-between">
            <span class="font-semibold">학교 종류명:</span>
            <span>{{ schoolData.SCHOOL_KIND_NM }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">설립 구분명:</span>
            <span>{{ schoolData.FOUND_DIV_NM }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">단과대학명:</span>
            <span>{{ schoolData.COLGE_UNIV_NM || "없음" }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">학과명(전공):</span>
            <span>{{ schoolData.MJR_NM || "없음" }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">남자 졸업자 수:</span>
            <span>{{ schoolData.MALE_GRA_CNT }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">여자 졸업자 수:</span>
            <span>{{ schoolData.FEMALE_GRA_CNT }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">건강보험 연계 취업자 수:</span>
            <span>{{
              Number(schoolData.HTIR_CONCTN_MALE_EMPLYE_CNT) +
                Number(schoolData.HTIR_CONCTN_FEMALE_EMPLYE_CNT) || 0
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">취업률:</span
            ><span>{{ schoolData.EMPLYMT_RT }}%</span>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const accesskey = "b973ba2d24e2416793bf5a5ef7463b9e";

const route = useRoute();
const schoolName = route.query.school || "";
const majorName = route.query.major || "";

const normalize = (str) =>
  str.toLowerCase().replace(/\s/g, "").replace(/_/g, "");

const schoolData = ref(null);
const loading = ref(true);

const fetchDetail = async () => {
  loading.value = true;
  try {
    const res = await axios.get(
      `https://openapi.gg.go.kr/Grduemplymtuniv?KEY=${accesskey}&Type=json&pIndex=1&pSize=100`
    );

    if (res.data && res.data.Grduemplymtuniv && res.data.Grduemplymtuniv[1]) {
      const allData = res.data.Grduemplymtuniv[1].row;

      const found = allData.find((item) => {
        const schoolNm = item.SCHOOL_NM ?? "";
        const mjrNm = item.MJR_NM ?? "";

        const schoolMatch = normalize(schoolNm) === normalize(schoolName);
        const majorMatch = majorName
          ? normalize(mjrNm) === normalize(majorName)
          : true;

        return schoolMatch && majorMatch;
      });

      schoolData.value = found || null;
    } else {
      schoolData.value = null;
    }
  } catch (error) {
    schoolData.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDetail();
});
</script>
