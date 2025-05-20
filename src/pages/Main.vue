<template>
  <header
    class="w-[100%] h-[60px] bg-[#3B3B3B] flex items-center justify-center text-[20px] text-white font-[800]"
  >
    대학 별 취업현황
  </header>
  <div
    class="w-[100%] h-[auto] bg-white flex flex-col justify-center items-center mt-[10px]"
  >
    <div
      v-for="data in datas"
      :key="data.SCHOOL_NM"
      class="w-[1000px] bg-[#e8dcca] border-0.3 shadow-md rounded-2xl p-4 my-4 flex flex-col gap-2 border-"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">{{ data.SCHOOL_NM }}</h2>
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
    </div>
  </div>
</template>

<script setup>
const accesskey = "b973ba2d24e2416793bf5a5ef7463b9e	";
const BASE_URL = "https://openapi.gg.go.kr/Grduemplymtuniv";

import { onMounted, ref } from "vue";
import axios from "axios";

const datas = ref([]);
const handleSubmit = async () => {
  try {
    const res =
      await axios.get(`https://openapi.gg.go.kr/Grduemplymtuniv?KEY=${accesskey}&Type=json&pIndex=1&pSize=100
  `);
    if (res.data) {
      console.log("데이터 조회 성공");
      datas.value = res.data.Grduemplymtuniv[1].row;
      console.log(datas);
    } else {
      console.log("데이터 조회 실패");
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  handleSubmit();
});
</script>
