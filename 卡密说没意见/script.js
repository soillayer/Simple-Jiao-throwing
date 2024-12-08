// 拖拽功能实现
(function() {
    const draggableContainer = document.getElementById('draggableContainer');
    const dragHeader = document.getElementById('dragHeader');

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    dragHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        // 计算鼠标点击位置相对于容器的偏移量
        const rect = draggableContainer.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggableContainer.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggableContainer.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            // 计算新的位置
            let left = e.clientX - offsetX;
            let top = e.clientY - offsetY;

            // 获取视口宽高
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // 获取容器宽高
            const containerWidth = draggableContainer.offsetWidth;
            const containerHeight = draggableContainer.offsetHeight;

            // 限制容器不超出视口
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (left + containerWidth > viewportWidth) left = viewportWidth - containerWidth;
            if (top + containerHeight > viewportHeight) top = viewportHeight - containerHeight;

            draggableContainer.style.left = left + 'px';
            draggableContainer.style.top = top + 'px';
            draggableContainer.style.transform = 'none'; // 取消初始的 translate(-50%, -50%)
        }
    });

    // 防止选中文本时拖动时出现问题
    dragHeader.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
})();

function generateResults() {
    const outcomes = ['正面', '反面'];
    const imagePaths = {
        '正面': 'images/正面.png',
        '反面': 'images/反面.png'
    };
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const resultText = document.getElementById('resultText');

    const result1 = outcomes[Math.floor(Math.random() * outcomes.length)];
    const result2 = outcomes[Math.floor(Math.random() * outcomes.length)];

    // 移除当前可见的图片
    image1.classList.remove('visible');
    image2.classList.remove('visible');

    // 设置图片源
    image1.src = imagePaths[result1];
    image2.src = imagePaths[result2];

    // 添加淡入效果
    setTimeout(() => {
        image1.classList.add('visible');
        image2.classList.add('visible');
    }, 50); // 延迟以确保src已经更新

    if (result1 === '正面' && result2 === '正面') {
        resultText.textContent = '圣筊';
    } else if (result1 !== result2) {
        resultText.textContent = '笑筊';
    } else {
        resultText.textContent = '哭筊';
    }
}

function toggleDescription() {
    const details = document.getElementById('descriptionDetails');
    const button = document.querySelector('.toggle-button');
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        button.textContent = '查看更多';
    } else {
        details.classList.add('show');
        button.textContent = '收起';
    }
}

// 初始化图片为不可见状态
window.onload = function() {
    const images = document.querySelectorAll('.fade');
    images.forEach(img => {
        img.classList.remove('visible');
    });
};