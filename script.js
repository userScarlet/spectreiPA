    const menu = document.getElementById('cheatMenu');
    const header = document.getElementById('dragHeader');
    const mskDisplay = document.getElementById('mskTimeDisplay');
    const mskToggle = document.getElementById('toggleMskTime');

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let timeInterval = null;

    const rect = menu.getBoundingClientRect();
    menu.style.transform = 'none';
    menu.style.left = rect.left + 'px';
    menu.style.top = rect.top + 'px';

    const startDrag = (e) => {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        initialLeft = parseInt(menu.style.left);
        initialTop = parseInt(menu.style.top);
        header.style.cursor = 'grabbing';
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;
        menu.style.left = (initialLeft + dx) + 'px';
        menu.style.top = (initialTop + dy) + 'px';
    };

    const stopDrag = () => {
        isDragging = false;
        header.style.cursor = 'grab';
    };

    header.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    header.addEventListener('touchstart', startDrag, {passive: false});
    document.addEventListener('touchmove', onDrag, {passive: false});
    document.addEventListener('touchend', stopDrag);

    const navIcons = document.querySelectorAll('.nav-icon');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            navIcons.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            icon.classList.add('active');
            const targetId = icon.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    const updateMskTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            timeZone: 'Europe/Moscow',
            hour12: false
        });
        mskDisplay.textContent = `MSK: ${timeString}`;
    };

    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');

            if (this.id === 'toggleMskTime') {
                if (this.classList.contains('active')) {
                    mskDisplay.style.display = 'block';
                    updateMskTime();
                    timeInterval = setInterval(updateMskTime, 1000);
                } else {
                    mskDisplay.style.display = 'none';
                    clearInterval(timeInterval);
                }
            }
        });
    });
