/**
 * Обработчик событий для страницы
 * 
 * @returns {void}
 */
$(document).ready(function() {
    // Создаём массив элементов-кружков
    let circles = [];
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];

    // Создаем 12 кружков
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180; // -90° чтобы начать с 12 часов
        const radius = 120;
        const x = 150 + radius * Math.cos(angle);
        const y = 150 + radius * Math.sin(angle);

        const circle = $('<div>')
            .addClass('hour-marker')
            .text(alphabet[Math.floor(Math.random() * alphabet.length)])
            .css({
                left: (x - 10) + 'px',
                top: (y - 10) + 'px'
            })
            .appendTo('.clock-face');
        
        circles.push(circle);
    }

    let currentPosition = 0;
    let previousPosition = -1;

    /**
     * Функция обработки вращения стрелки
     * 
     * @returns {void}
     */
    function updateClock() {
        // Сбрасываем предыдущий кружок
        if (previousPosition !== -1) {
            circles[previousPosition].css({
                width: '20px',
                height: '20px',
                background: '#333'
            });
        }

        // Увеличиваем текущий кружок
        circles[currentPosition].css({
            width: '30px',
            height: '30px',
            background: colors[Math.floor(Math.random() * colors.length)]
        });

        // Просто поворачиваем на 30 градусов каждый раз
        const degrees = currentPosition * 30 + 90;
        $('.second-hand').css('transform', `rotate(${degrees}deg)`);

        // Обновляем позиции
        previousPosition = currentPosition;
        currentPosition = (currentPosition + 1) % 12;
    }

    // Запускаем обновление каждую секунду
    setInterval(updateClock, 1000);
    
    // Первое обновление
    updateClock();
});