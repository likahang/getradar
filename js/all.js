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
  
  async function generateImageLinks() {
    const imageContainer = document.getElementById('imageContainer');
    if (!imageContainer) {
      console.error("imageContainer not found!");
      return;
    }
  
    imageContainer.innerHTML = ''; // 清空之前生成的圖片
  
    const imageElements = []; // 儲存載入的圖片元素
  
    for (let i = 0; i < 13; i++) {
      const imageUrl = getRadarImageUrl(i);
      const imageElement = document.createElement('img');
      imageElement.setAttribute('data-time', i); // 將 i 值儲存在自訂屬性 data-time 中
  
      try {
        await new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
          imageElement.src = imageUrl;
        });
  
        imageElements.push({ element: imageElement, time: i });
      } catch (error) {
        console.error(`Failed to load image ${imageUrl}`);
        imageElement.remove(); // 從 imageContainer 中刪除失敗的圖片
      }
    }
  
    // 根據時間順序排序圖片元素陣列
    imageElements.sort((a, b) => a.time - b.time);
  
    // 添加排序後的圖片元素到 imageContainer 中
    for (const { element } of imageElements) {
      imageContainer.appendChild(element);
    }
  }
  
  generateImageLinks();
  

});