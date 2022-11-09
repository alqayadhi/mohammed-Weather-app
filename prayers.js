// PrayTime Api


const cards = document.querySelector('.cards');

getPrayTimes();

function getPrayTimes(){
    fetch('http://api.aladhan.com/v1/timingsByCity?city=amsterdam&country=netherlands&method=8')
    .then(response => response.json())
    .then( data => {
        const times = data.data.timings['Fajr'];
        cards.innerHTML = "";
        for (let time in times){
            console.log(time);
            console.log(times[time]);
            cards.innerHTML += 
            `
            <div class="card">
                <div class="circle">
                    <svg>
                        <Circle cx="45" cy="45" r="45"></Circle>
                    </svg>
                <div class="prayTime">${times[time]}</div>
                </div>
                <p>${time}</p>
            </div>
            `
        }
    })
       
        
}