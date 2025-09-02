            /**
             * Обработчик событий для страницы
             * 
             * @returns {void}
             */
            $(document).ready(function() {
                //Создаём массив элементов-кружков
                let arrCircle = [];

                //Сoздаём массив английских букв
                let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

                //Создаём массив цветов
                let colors = ['red', 'orange', 'yellow', 'green', 'sky', 'blue', 'purple'];

                // Создаем 12 кружков для часовых меток
                for (let i = 1; i <= 12; i++) {
                    const angle = (i - 3) * 30; // 30 градусов на каждый час (360/12)
                    const radius = 120; // Радиус расположения кружков
                    
                    // Вычисляем позицию кружка
                    const x = 150 + radius * Math.cos(angle * Math.PI / 180);
                    const y = 150 + radius * Math.sin(angle * Math.PI / 180);
                    
                    // Создаем элемент кружка
                    const circle = $('<div>')
                        .addClass('hour-marker')
                        .text(alphabet[Math.floor(Math.random()*alphabet.length)])
                        .css({
                            left: x - 10 + 'px', // Центрируем кружок
                            top: y - 10 + 'px'   // Центрируем кружок
                        })
                        .appendTo('.clock-face');
                    arrCircle.push(circle);
                }
                
                $('.second-hand').css('transform', 'rotate(-60deg)'); // Устанавливаем правильное положение стрелки
                let sec = 0; // Начальное значение времени
                /**
                 * Функция обработки времени
                 * 
                 * @returns {void}
                 */
                function updateTime() {
                    let x;
                    sec > 0 ? x = -1 : x = 11;
                    arrCircle[sec + x].css({
                        width: '20px',
                        height: '20px',
                        background: "#333"
                    })

                    arrCircle[sec].css({
                        width: '30px',
                        height: '30px',
                        background: colors[Math.floor(Math.random()*colors.length)]
                    })

                    // Вычисляем угол для секундной стрелки
                    // 30 градусов на каждую секунду (360/60) + плавное движение
                    const secondDegrees = sec * 30 - 60;

                    // Обновляем позицию секундной стрелки и значение sec
                    $('.second-hand').css('transform', `rotate(${secondDegrees}deg)`);
                    sec = (sec + 1)%12;
                }
                
                // Обновляем время каждые 1000ms для плавности
                setInterval(updateTime, 1000);
                
                // Первоначальное обновление
                updateTime();
            });