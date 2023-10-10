let DEMO_KEY = 'EeK1LKzVougtZVWX7AQBhIqfj59G2diKNPNTtCNV'
let photosDiv  = document.querySelector('#photo')
let screenHeigth = window.innerHeight
let screenWidth = window.innerWidth
let page = 1
let sol = 1
let loader = document.querySelector('.loader')
let time = 5000
async function run(DEMO_KEY, page, sol ) {
    try {
        photosDiv.innerHTML = ''
        loader.style.display = 'inline-block'
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${DEMO_KEY}`);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            loader.style.display = 'none'
            for(let i = 0; i < 4; i++) {
                photosDiv.innerHTML += `<img src=${data.photos[i].img_src} id=photo${i} width=${screenWidth/2-450} height=${screenHeigth/2-100}>`
            }
        } else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
    console.error('An error occurred:', error);
    setInterval(() => {
        time -= 100
        photosDiv.innerHTML = `sorry, we dont have any imgs, reload after ${time/1000} sec`
    }, 100)
    setTimeout(function() {
        location.reload();
      }, time);
    }
}

document.querySelector('#next_sol').addEventListener('click',() => {
    sol += 1;
    run(DEMO_KEY, page, sol)
})
document.querySelector('#next_page').addEventListener('click',() => {
    page += 1;
    run(DEMO_KEY, page, sol)
})
document.querySelector('#prev_page').addEventListener('click',() => {
    if(page > 0) {
        page -= 1;
        run(DEMO_KEY, page, sol)
    }
})
document.querySelector('#prev_sol').addEventListener('click',() => {
    if(sol > 0) {
        sol -= 1;
        run(DEMO_KEY, page, sol)
    }
})
run(DEMO_KEY, page, sol)