const container = document.querySelector('.container');
const inputCountry = document.querySelector('.input');
const submitButton = document.querySelector('.submit-btn');
const neighbourHeading = document.querySelector('.countries');
const neighbourCountries = document.querySelector('.neighbour');

const fetchAPI = async function (para) {
    try{
        const paraURL = `https://restcountries.com/v3.1/name/${para}`;
        const res = await fetch(paraURL);
        const data = await res.json();
        const countries = data.filter(item => item.name.common === para);
        console.log(countries);
        bordersArray = countries[0].borders;

        neighbourHeading.innerHTML = `Neighbour Countries of <b>${para}</b> are : `;
        neighbourCountries.innerHTML = "";
        let index = 1;
        for(code of bordersArray) {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await res.json();

            const ptag = document.createElement('p');
            ptag.innerHTML = `${index++}. Common Name is <b>${data[0].name.common}</b> and Official Name is <b>${data[0].name.official}</b>`;
            neighbourCountries.append(ptag);
        }
        inputCountry.value = "";
    }
    catch(error){
        console.log(error);
        inputCountry.value = "";
        neighbourHeading.innerHTML = "";
    }
}

submitButton.addEventListener('click', () => {
    const name = inputCountry.value;
    fetchAPI(name);
});

window.addEventListener('keypress', (e) => {
    if(e.key === "Enter") submitButton.click();
});