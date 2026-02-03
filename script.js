const scriptURL = 'https://script.google.com/macros/s/AKfycbzGeWsRonzWVlWvwSpRxDdFmI9V1Ve8Kcp0ggsTJbmm7ueAKs5EnYnn1QQCoYSbhBCsog/exec';
const form = document.getElementById('labForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerText = "Đang xử lý dữ liệu...";

    // Chuyển form data thành object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Thêm các thông tin ngoài form
    data.sampleName = document.getElementById('sampleName').value;
    data.timestamp = new Date().toLocaleString('vi-VN');

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
    .then(() => {
        status.innerText = "Đã lưu vào Google Sheet thành công!";
        status.style.color = "green";
        form.reset();
    })
    .catch(error => {
        status.innerText = "Lỗi kết nối: " + error.message;
        status.style.color = "red";
    });
});
