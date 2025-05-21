// src/api/work24.js
import axios from 'axios'

const BASE_URL = 'https://www.work24.go.kr/cm/openApi/call/hr/callOpenApiSvcInfo310L01.do'
const WORK24_API_KEY = 'ab2d40f4-1de5-4b90-9314-842ac94d6414'

export async function fetchTrainingList({
    pageNum = 1,
    pageSize = 100,
    srchTraArea1 = '11',
    srchTraStDt = '20250101',
    srchTraEndDt = '20251231'
  } = {}) {
    const params = {
      authKey: WORK24_API_KEY,
      returnType: 'JSON',
      outType: 1,
      sort: 'ASC',
      sortCol: 'TOT_FXNUM',
      pageNum,
      pageSize,
      srchTraArea1,
      srchTraStDt,
      srchTraEndDt,
    }
  
    try {
        // 첫 페이지에서 totalCount 확인
        const first = await axios.get(BASE_URL, { params: { ...params, pageNum: 1 } })
        const totalCount = first.data.totalCount || 0
        const totalPages = Math.ceil(totalCount / pageSize)
    
        const allResults = [...(first.data.srchList || [])]
    
        for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
          const res = await axios.get(BASE_URL, {
            params: { ...params, pageNum }
          })
          allResults.push(...(res.data.srchList || []))
        }

        console.log(allResults.length)
    
        return allResults
      } catch (error) {
        console.error('훈련 정보 전체 불러오기 실패:', error)
        return []
      }
    }

