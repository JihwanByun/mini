import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    datas: [],
  }),
  actions: {
    async fetchDatas() {
      const accesskey = "b973ba2d24e2416793bf5a5ef7463b9e";
      const allData = [];
      for (let page = 1; page <= 150; page++) {
        try {
          const res = await axios.get(
            `https://openapi.gg.go.kr/Grduemplymtuniv?KEY=${accesskey}&Type=json&pIndex=${page}&pSize=100`
          );
          const pageData = res.data?.Grduemplymtuniv?.[1]?.row || [];
          allData.push(...pageData);
          console.log(`페이지 ${page} 데이터 로드 완료`);
        } catch (err) {
          console.error(`페이지 ${page} 데이터 로드 실패:`, err);
        }
      }
      this.datas = allData;
      console.log("모든 데이터 로드 완료, 총 항목:", this.datas.length);
    },
  },
});
