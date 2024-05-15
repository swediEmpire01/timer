function next(){
   if(on.num== 0){
        document.getElementById("timer").style.display= "block";
        document.getElementById("clock").style.display= "none";
        on.num++;
   }
   else{
        document.getElementById("timer").style.display= "none";
        document.getElementById("clock").style.display= "flex";
        on.num= 0;
   }
}


let on= {num:0};
let elapsedTime= 0;
let beginTime= 0;
let running= false;

let timer= {
    milliSeconds:0,
    seconds: 0,
    minutes: 0,
    hours:0
}

let timing;

function reset(){
    elapsedTime= 0;
    beginTime= Date.now();
    document.getElementById("time-diply").textContent= `00:00:00:00` ;
}


function start(){
    if(!running){
        beginTime= Date.now() - elapsedTime;
        timing= setInterval(function(){count()} , 10);
        running= true;
    }
}


function count(){
    const currentTime= Date.now();
    elapsedTime= currentTime - beginTime; 
    running= true
    timer.hours= Math.floor(elapsedTime / (1000 * 60 * 60));
    timer.minutes= Math.floor(elapsedTime / (1000 * 60 ) % 60);
    timer.seconds= Math.floor(elapsedTime / 1000 % 60);
    timer.milliSeconds= Math.floor(elapsedTime % 1000 / 10);   

    document.getElementById("time-diply").textContent= `${timer.hours.toString().padStart(2,0)}:${timer.minutes.toString().padStart(2,0)}:${timer.seconds.toString().padStart(2,0)}:${timer.milliSeconds.toString().padStart(2,0)}`;
    
}

function stop(){
    if(running){
        clearInterval(timing);
        elapsedTime= Date.now() - beginTime;
        running= false;
    }
}


//THIS IS FOR THE CLOCK DISPLAY PEEPS

function clock(){
    let dateObject= new Date();
    let timeDisplay=`${dateObject}`;
    timeDisplay= timeDisplay.split(" ");


// displays the times
    let time= timeDisplay[4].slice(0, 5);
    if (Number(time.slice(0, 2))> 12){
        document.getElementById("meridiem").textContent= " PM";
    }
    else{
        document.getElementById("meridiem").textContent= " AM"
    }
    document.getElementById("clock-display").textContent= time;

// displays the times Date
    let date=` ${timeDisplay[0].toUpperCase()}, ${timeDisplay[1].toUpperCase()} ${timeDisplay[2]} `
    document.getElementById("clock-more-info-one").textContent= date;

// displays the time  zone
    let dateZone=` ${timeDisplay[6].replace("(", "")} ${timeDisplay[7]} ${timeDisplay[8]} ${timeDisplay[9].replace(")", "")} `
    document.getElementById("clock-more-info-two").textContent= dateZone;

    let contries=[  {name:"Tokyo", country: "Japan", hours: 7, minutes: 30 ,timeDifference: "7 hours ahead"},
    {name:"Delhi", country: "India", hours: 3, minutes: 30, timeDifference: "3 hours & 30 minutes ahead"},
    {name:"Shanghai", country: "China",  hours: 6, minutes: 0, timeDifference: "6 hours ahead" },
    {name:"London", country: "United Kingdom",  hours: -2, minutes: 0,timeDifference: "2 hours behind"},
    {name:"Washington D.C", country: "United States",  hours: -6, minutes: 0,timeDifference: "6 hours behind"},
    {name:"Athens", country: "Greece",  hours: 1, minutes: 6, timeDifference: "1 hour ahead"}];

let diplyCities= "";
for(let i= 0; i < contries.length; i++){
    let CityMeridiem="";

    let cityHours= dateObject.getHours();
    let cityMinutes=dateObject.getMinutes();
    cityHours+= contries[i].hours;
    cityMinutes+= contries[i].minutes;
    if(cityHours> 24){
        cityHours-=24;
    }
    if(cityMinutes>59){
        cityMinutes-= 60;;
    }
    if(cityHours< 0){
        cityHours+=24;
    }


    
    if (Number(cityHours)> 12){
        CityMeridiem= " PM";
    }
    else{
        CityMeridiem= " AM"
    }


    let citiesZone= `<div class="cities">
                        <div class="city-names">
                            <p class="city-id">${contries[i].name}</p>
                            <p class="city-behind">${contries[i].timeDifference}</p>
                        </div>
                        <div class="cities-time">
                            <p class="clock-city" id="time${i}">${cityHours}:${cityMinutes.toString().padStart(2,0)}</p>
                            <p id="city-meridiem" id="merid${i}">${CityMeridiem}</p>
                        </div>
                    </div>
                    </hr>`;
    diplyCities+=citiesZone;
}
document.getElementById("show-contries").innerHTML= diplyCities;

}
setInterval(clock, 500);


// THIS IF FOR THE STOP WATCH THINGY MA JIGY

let compNumber={
    number: ""
};

function diplayStop(number){
    compNumber.number+=number;
    let firstIndex= "00";
    let seconIndex= "00";
    let thirdIndex= "00";
    let position= compNumber.number.length
    let numbers =compNumber.number.split("")
    console.log(numbers);
    if(position > 5){
        firstIndex= numbers[4] + numbers[5];
        seconIndex= numbers[2] + numbers[3];
        thirdIndex= numbers[0] + numbers[1];
    }
    else if(position == 5){
        firstIndex= numbers[3] + numbers[4];
        seconIndex= numbers[1] + numbers[2];
        thirdIndex="0"+ numbers[0];
    }
    else if(position == 4){
        firstIndex= numbers[2] + numbers[3];
        seconIndex= numbers[0] + numbers[1];
        thirdIndex="00";
    }
    else if(position == 3){
        firstIndex= numbers[1] + numbers[2];
        seconIndex= "0"+ numbers[0];
        thirdIndex="00";
    }
    else if(position == 2){
        firstIndex= numbers[0] + numbers[1];
        seconIndex= "00";
        thirdIndex="00";
    }
    else if(position == 1){
        firstIndex="0"+ numbers[0];
        seconIndex= "00";
        thirdIndex="00";
    }
    
    console.log(position)
    console.log(thirdIndex, seconIndex, firstIndex)

}