const content = document.querySelector('main')
const KEY = '3a569de6797adf313de8be016ba1d59d'



// Получение данных по геолокации
navigator.geolocation.getCurrentPosition(
    (position) => {
    const { latitude, longitude } = position.coords
    console.log(latitude);
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`
    rendeCoord(getCoord(API))},
    (err) => {
        getIP(err)
})

// Получение данных по IP
async function getIP(){
    const ipResponse = await fetch('https://ipapi.co/json/');// ссылка для получения местоположения по айпи
    if (!ipResponse.ok) throw new Error('Cannot fetch IP location');
    const { latitude, longitude } = await ipResponse.json();
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`
    rendeCoord(getCoord(API))
}



async function getCoord(API){
    try{
        const res = await fetch(API)
        console.log(res);
        if (!res.ok){
            throw new Error(res.status);
        }
        return  res.json();
    } catch (err){
        console.log(err);
    }
}

async function rendeCoord(prom){
        const arr = await prom
        console.log(arr);
        renderInformation(arr)
}






// Получение данных
async function getAPICityName(KEY, cityName){
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEY}`
    console.log(API);
    
    try{
        const res = await fetch(API)
        if (!res.ok){
            throw new Error(res.status);
        }
        return  res.json();
    } catch (err){
        console.log(err);
    }
}





// Функция создает HTML документ с содержимым
async function renderContent(){
    const container = document.createElement('div')
    container.className = 'container'
    const weatherContent = document.createElement('div')
    weatherContent.className = 'weather__content'
    const upperText = document.createElement('p')
    upperText.className = 'upper__text'
    upperText.textContent = 'Weather'
    const weatherBox = document.createElement('div')
    weatherBox.className = 'weather__box'
    const lowerText = document.createElement('p')
    lowerText.className = 'lower__text'
    lowerText.textContent = 'With ❤️ by Alex'
    
// Добавляет вложенность
    content.append(container)
    container.append(weatherContent)
    weatherContent.append(upperText)
    weatherContent.append(weatherBox)
    weatherContent.append(lowerText)
}

renderContent()



// Функция создания инпута
async function inputRender(){
    const weatherBox = document.querySelector('.weather__box')
    weatherBox.innerHTML = ''
    const weatherInformation = document.createElement('div')
    weatherInformation.className = 'weather__information'
    const weatherDescription = document.createElement('form')
    weatherDescription.className = 'weather__description'
    weatherDescription.action = ''
    const input = document.createElement('input')
    input.type = "text"
    input.className = 'input__city'
    input.placeholder = 'Type your city here'
    const hr = document.createElement('hr')
    hr.className = 'input__line'
    const buttonFind = document.createElement('button')
    buttonFind.className = "find"
    buttonFind.textContent = 'Find'
    
    weatherBox.append(weatherInformation)
    weatherBox.append(buttonFind)
    weatherDescription.append(input)
    weatherDescription.append(hr)
    weatherInformation.append(weatherDescription)
    
    

    weatherDescription.addEventListener('submit', (evt) =>{
        evt.preventDefault()
        findHandler(KEY, input.value)
    })

    buttonFind.addEventListener('click', () => {
        findHandler(KEY, input.value)
    })
    
}

// inputRender()

async function findHandler(KEY, value){
    if (value != ''){
        const data = getAPICityName(KEY, value)
        const arr = await data
        renderInformation(arr)
    }
}


// Функция отображает информацию
async function renderInformation(arr) {
    try {

        const weatherBox = document.querySelector('.weather__box')
        weatherBox.innerHTML = ''
        const weatherInformation = document.createElement('div')
        weatherInformation.className = 'weather__information'
        const weatherDescription = document.createElement('div')
        weatherDescription.className = 'weather__description'
        const degreesText = document.createElement('p')
        degreesText.className = 'degrees'
        degreesText.textContent = `${Math.round(arr.main.temp) - 273}℃`
        const city = document.createElement('p')
        city.className = 'weather__city'
        city.textContent = `Windy in ${arr.name}`
        const change = document.createElement('button')
        change.className = 'change'
        change.textContent = 'Change city'
    
        weatherBox.append(weatherDescription)
        weatherDescription.append(degreesText)
        weatherDescription.append(city)
        weatherBox.append(change)
    
        change.addEventListener('click', () =>{
            inputRender()
        })
    } catch(err) {
        renderError(err)
    }

}

// renderInformation()


async function renderError(err) {
    const weatherBox = document.querySelector('.weather__box')
    weatherBox.innerHTML = ''
    const weatherInformation = document.createElement('div')
    weatherInformation.className = 'weather__information'
    const weatherDescription = document.createElement('div')
    weatherDescription.className = 'weather__description'
    const massage = document.createElement('p')
    massage.className = 'massage'
    massage.textContent = 'Ooops. Something went wrong.'
    const errorButton = document.createElement('button')
    errorButton.className = 'error'
    errorButton.textContent = `${err.name}`
    const again = document.createElement('button')
    again.className = 'again'
    again.textContent = 'Try again'

    weatherBox.append(weatherDescription)
    weatherDescription.append(massage)
    weatherDescription.append(errorButton)
    weatherBox.append(again)

    again.addEventListener('click', () => {
        inputRender()
    })

    errorButton.addEventListener('click', () =>{
        alert(err)
    })

}

