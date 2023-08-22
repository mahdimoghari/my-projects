/// api برای دریافت اطلاعات شهر و ...

const getloc = async () => {
    const url = 'http://ip-api.com/json/{query}?fields=country,city,lat,lon,timezone' ;

    const response = await fetch(url) ;
    const data = await response.json() ;

    return data ;

}


///api برای دریافت اطلاعات آب و هوایی

const getweather = async (lat , lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=923e1fb48cde6d14a83df0c5483e9835` ;

    const response  = await fetch(url) ;
    const data = await response.json() ; 

    return data ;
}


///  برای دریافت شب/روز بودن

function getdayornight() {
    let dayornight;
    let d = new Date();   ///obj

    if(d.getHours() >= 6 && d.getHours() <= 19){    ///method
        dayornight = 'Day' ;
    }

    else{
        dayornight =  'Night' ;
    }

}


///انتخاب آیکون با توجه به شرایط 

function getIcon(weMain){
    let icon;

    icon = (weMain === 'Clear' ? `${weMain}-${getdayornight()}.svg` : `${weMain}.svg`)

    // switch (weMain) {
    //     case 'Thunderstorm':
    //         icon = `${weMain}.svg`;
    //         break;
    //     case 'Drizzle':
    //         icon = `${weMain}.svg`;
    //         break;
    //     case 'Rain':
    //         icon = `${weMain}.svg`;
    //         break;
    //     case 'Snow':
    //         icon = `${weMain}.svg`;
    //         break;
    //     case 'Clear':
    //         const DayOrNigh = getdayornight();
    //         icon = `${weMain}-${DayOrNigh}.svg`;
    //         break;
    //     case 'Clouds':
    //         icon = `${weMain}.svg`;
    //         break;
    //     case 'Atmosphere':
    //         icon = `${weMain}.png`;
    //         break;
    // }
    return icon;
}


/// فانکشن برای تبدیل دما ها به کلوین /فارنهایت /سیلسیوس

function gettemp (wetemp) {
    const k = wetemp ;
    const f = (k - 273.15) * 9/5 + 32 ;
    const c = k - 273.15 ;
    return temp = {kel:Math.floor(k) , far:Math.floor(f), can:Math.floor(c)};

}


///انتخاب هر المنت و قراردادن  در متغییر

const locationtimezone = document.querySelector('.timezone') ;
const icon = document.querySelector('.icon') ;
const degreesection = document.querySelector('.degree-section') ;
const degree = document.querySelector('.degree-section h2') ;
const unit = document.querySelector('.degree-section span') ;
const tempraturedescription = document.querySelector('.temprature-description') ;


getloc()
    .then( locdata => {                  ///اطلاعات مکانی
        const Timezone = locdata.timezone;
        locationtimezone.textContent = Timezone;
        return getweather(locdata.lat, locdata.lon) ;
    }).then(wedata => {                   ///اظلاعات دمایی و ایکون و توضیخات
        const wetemp = wedata.main.temp;
        const wemain = wedata.weather[0].main ;
        const wedes =  wedata.weather[0].description ;

        const nameicon = getIcon(wemain);
        icon.innerHTML=`<img src='icons/${nameicon}'></img>`

        degree.textContent = Math.floor(wetemp);
        unit.textContent = 'K' ;


        degreesection.addEventListener('click', function(e){
            if(unit.textContent == 'K'){
                degree.textContent = gettemp(wetemp).far;
                unit.textContent = 'F';

            }
            else if(unit.textContent == 'F'){
                degree.textContent = gettemp(wetemp).can;
                unit.textContent = 'C';
            }
            else{
                degree.textContent = gettemp(wetemp).kel;
                unit.textContent = 'K';
            }
        })

        

        tempraturedescription.textContent = wedes;
        

    })

