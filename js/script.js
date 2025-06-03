document.addEventListener('DOMContentLoaded', () => {
    const cars1 = document.querySelectorAll('.lane-1 .car');
    const cars2 = document.querySelectorAll('.lane-2 .car');
    const startStopBtn1 = document.createElement('button');
    const startStopBtn2 = document.createElement('button');
    const simulationArea = document.querySelector('.simulation-area');

    startStopBtn1.textContent = 'Iniciar Tráfego (Sentido 1)';
    startStopBtn2.textContent = 'Iniciar Tráfego (Sentido 2)';

    simulationArea.appendChild(startStopBtn1);
    simulationArea.appendChild(startStopBtn2);

    let isRunning1 = false;
    let isRunning2 = false;

    function startCars(laneCars, direction) {
        laneCars.forEach((car, index) => {
            if (direction === 'left') {
                car.style.left = `${-40 - (index * 60)}px`;
                car.style.animation = `carMoveRight 5s linear infinite`;
                car.style.animationDelay = `${index * 0.5}s`;
            } else {
                car.style.right = `${-40 - (index * 60)}px`;
                car.style.animation = `carMoveLeft 5s linear infinite`;
                car.style.animationDelay = `${index * 0.5}s`;
            }
        });
    }

    function stopCars(laneCars) {
        laneCars.forEach(car => {
            car.style.animation = 'none';
            if (car.classList.contains('car-1') || car.classList.contains('car-2')) {
                car.style.left = '-40px';
            } else {
                car.style.right = '-40px';
            }
        });
    }

    startStopBtn1.addEventListener('click', () => {
        isRunning1 = !isRunning1;
        if (isRunning1) {
            startStopBtn1.textContent = 'Parar Tráfego (Sentido 1)';
            startCars(cars1, 'left');
            stopCars(cars2); // Garante que o tráfego no sentido oposto pare
            isRunning2 = false; // Desativa o outro sentido
            startStopBtn2.textContent = 'Iniciar Tráfego (Sentido 2)';
        } else {
            startStopBtn1.textContent = 'Iniciar Tráfego (Sentido 1)';
            stopCars(cars1);
        }
    });

    startStopBtn2.addEventListener('click', () => {
        isRunning2 = !isRunning2;
        if (isRunning2) {
            startStopBtn2.textContent = 'Parar Tráfego (Sentido 2)';
            startCars(cars2, 'right');
            stopCars(cars1); // Garante que o tráfego no sentido oposto pare
            isRunning1 = false; // Desativa o outro sentido
            startStopBtn1.textContent = 'Iniciar Tráfego (Sentido 1)';
        } else {
            startStopBtn2.textContent = 'Iniciar Tráfego (Sentido 2)';
            stopCars(cars2);
        }
    });
});