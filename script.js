// script.js

const apiKey = 'f4bfc0c9b1924695b3c808cc031b2d26'; // 인증키 입력
const schoolCode = '8750133'; // 행정표준코드 입력
const today = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Seoul'})).toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜

console.log(today)

// Open API를 통해 급식 메뉴 데이터를 가져옴
fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=R10&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${today}&Type=json&KEY=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const menuList = document.getElementById('menu-list');

        if (data && data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row && data.mealServiceDietInfo[1].row.length > 0) {
          data.mealServiceDietInfo[1].row.forEach(row => {
            const listItem = document.createElement('li');
            const menuText = row.DDISH_NM.replace(/\((1[0-9]|[1-9])(\.\d+)*\)/g, "");
            listItem.innerHTML = menuText.replace(/<br\s*\/?>/g, '<br/>');
            menuList.appendChild(listItem);
          });
    } else {
      alert('오늘의 급식이 없습니다.');
    }
  })
  .catch(error => {
    console.error('Fetch Error:', error);
  });
