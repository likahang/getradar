    $(document).ready(function() {
 // 函式來計算當前時間對應的圖片連結
    function getRadarImageUrl(offset) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - (offset * 10));
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(Math.floor(now.getMinutes() / 10) * 10).padStart(2, '0');

      return `https://www.cwb.gov.tw/Data/radar/CV1_1000_${year}${month}${day}${hour}${minute}.png`;
    }

    // 生成最新13張圖片連結
    function generateImageLinks() {
      const imageContainer = document.getElementById('imageContainer');

      for (let i = 0; i < 13; i++) {
        const imageUrl = getRadarImageUrl(i);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;

        imageContainer.appendChild(imageElement);
      }
    }

    // 執行生成圖片連結的函式
    generateImageLinks();
//


function generateImageLinks() {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = ''; // 清空之前生成的圖片

  const imageElements = []; // 儲存載入的圖片元素

  for (let i = 0; i < 13; i++) {
    const imageUrl = getRadarImageUrl(i);
    const imageElement = document.createElement('img');

    // 添加onload事件處理函式
    imageElement.onload = function () {
      imageElements.push(this); // 將載入成功的圖片元素添加到陣列中

      if (imageElements.length === 13) {
        // 當13張圖片載入成功後，刪除最舊的圖片
        imageElements[0].remove();
        imageElements.shift(); // 從陣列中刪除最舊的圖片元素
      }

      if (imageElements.length === 12) {
        // 當12張圖片載入成功後，將所有圖片元素添加到imageContainer中
        for (const element of imageElements) {
          imageContainer.appendChild(element);
        }
      }
    };

    // 添加onerror事件處理函式
    imageElement.onerror = function () {
      this.remove(); // 從imageContainer中刪除失敗的圖片
      const index = imageElements.indexOf(this);
      if (index !== -1) {
        imageElements.splice(index, 1); // 從陣列中刪除失敗的圖片元素
      }
    };

    imageElement.src = imageUrl;
  }
}

});