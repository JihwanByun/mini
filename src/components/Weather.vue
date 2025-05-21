<template>
  <div class="h-[100%] flex items-center">
    <span class="text-[20px] mr-[10px] text-white font-[800]">{{ temp }}</span
    ><span class="text-[40px] mr-[30px]">{{ getWeatherIcon(weather) }}</span>
  </div>
</template>

<script setup>
const weather = ref(0);
const temp = ref(0);
const getWeather = async () => {
  try {
    const res =
      await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=37.55&longitude=127&current_weather=true&timezone=Asia%2FSeoul


  `);
    if (res.data) {
      console.log("데이터 조회 성공");
      console.log(res.data);
      console.log(res.data.current_weather);
      weather.value = res.data.current_weather.is_day;
      temp.value = res.data.current_weather.temperature;
    } else {
      console.log("데이터 조회 실패");
    }
  } catch (err) {
    console.error(err);
  }
};

function getWeatherIcon(weathercode) {
  const iconMap = {
    0: "☀️", // 맑음
    1: "🌤️", // 대체로 맑음
    2: "⛅", // 부분 흐림
    3: "☁️", // 흐림
    45: "🌫️", // 안개
    48: "🌫️❄️", // 서리 낀 안개
    51: "🌦️", // 약한 이슬비
    53: "🌦️", // 중간 이슬비
    55: "🌧️", // 강한 이슬비
    56: "🌧️❄️", // 약한 어는 이슬비
    57: "🌧️❄️", // 강한 어는 이슬비
    61: "🌧️", // 약한 비
    63: "🌧️", // 보통 비
    65: "🌧️", // 강한 비
    66: "🌧️❄️", // 약한 어는 비
    67: "🌧️❄️", // 강한 어는 비
    71: "🌨️", // 약한 눈
    73: "🌨️", // 보통 눈
    75: "🌨️", // 강한 눈
    77: "❄️✨", // 싸라기눈
    80: "🌦️", // 가벼운 소나기
    81: "🌦️", // 보통 소나기
    82: "🌧️⛈️", // 강한 소나기
    85: "🌨️", // 약한 눈 소나기
    86: "🌨️", // 강한 눈 소나기
    95: "⛈️", // 천둥번개
    96: "⛈️❄️", // 약한 우박 천둥번개
    99: "⛈️❄️", // 강한 우박 천둥번개
  };

  return iconMap[weathercode] || "";
}

import { onMounted, ref } from "vue";
import axios from "axios";
onMounted(() => {
  getWeather();
});
</script>
