<template>
  <div
    id="test"
    class="w-[100%] h-[100vh] bg-cover bg-center flex flex-col items-center justify-center"
    style="background-image: url('/background.png')"
  >
    <img src="/NextStep_Logo.png" class="w-[700px] mb-[130px]" id="floating" />
    <span class="absolute mt-[140px] text-white font-[800] text-[21px]"
      >이 데이터는 가능성을 증명해요. 당신의 가능성도 예외는 아니에요.</span
    >

    <input
      v-model="searchText"
      class="w-[300px] h-[50px] bg-white/40 absolute mt-[330px] rounded-[20px] border border-white pl-[15px] text-white focus:outline-none focus:bg-black/10"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const searchText = ref("");
watch(searchText, () => {
  console.log(searchText.value);
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(30px);
  }
  50% {
    transform: translateY(-10px);
  }
}

#floating {
  animation: float 3s ease-in-out infinite;
}
</style>
