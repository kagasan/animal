const DRAW_SPEED = 200; // 小さいほど早い
const LENGTH = 600;

window.onload = ()=>{
    document.body;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.body.appendChild(svg);
    svg.setAttribute('height', '100%');
    const circles = [];
    for (let i = 0; i < svg_info_list[0].circles.length; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.style.visibility = 'hidden';
        circle.setAttribute('id', `circle_${i}`);
        svg.appendChild(circle);
        circles.push(circle);
    }
    
    svg.addEventListener('click', () => {
        const time = Math.floor((new Date()).getTime()/DRAW_SPEED) % (LENGTH * svg_info_list.length);
        const idx = Math.floor(time / LENGTH);
        window.open(svg_info_list[idx].url);
    }, false);
    
    setInterval(()=>{
        const time = Math.floor((new Date()).getTime()/DRAW_SPEED) % (LENGTH * svg_info_list.length);
        const idx = Math.floor(time / LENGTH);
        const step = time % LENGTH;
        svg.setAttribute('viewBox', `0 0 ${svg_info_list[idx].width} ${svg_info_list[idx].height}`);
        document.title = `${Math.floor(100*step/LENGTH)}%`;
        for (let i = 0; i < svg_info_list[idx].circles.length; i++) {
            circles[i].setAttribute('cx', `${svg_info_list[idx].circles[i].cx}`);
            circles[i].setAttribute('cy', `${svg_info_list[idx].circles[i].cy}`);
            circles[i].setAttribute('r', `${svg_info_list[idx].circles[i].r}`);
            circles[i].setAttribute('style', `${svg_info_list[idx].circles[i].style}`);
            if (i <= step) circles[i].style.visibility = 'visible';
            else circles[i].style.visibility = 'hidden';
        }
    }, DRAW_SPEED);
}