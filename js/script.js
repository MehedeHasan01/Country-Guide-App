// DOM and HTML conector
const SearchBtn = document.getElementById('Search-btn');
const SearchIcon = document.querySelector('.icon');
const countryInp = document.getElementById('country-inp');
const result = document.getElementById('result');
const AllCountryNameBtn = document.getElementById('AllCountryNameBtn')
const CountryList = document.querySelector('.CountryList')




// Alll DOM Event
SearchBtn.addEventListener('click',()=>{
    ShowCountryDetails()

});
SearchIcon.addEventListener('click',()=>{
    ShowCountryDetails()

});
countryInp.addEventListener('input', ()=>{
    searchCountries()
});
AllCountryNameBtn.addEventListener('click', ()=>{
    AllCountryNameBtn.classList.add('activeBtn')
    CountryList.classList.toggle('active')
    console.log(    AllCountryNameBtn.classList.add('activeBtn'));
})



// Global

// All Country name list array
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


// Show all country Name for li list
countries.forEach(country =>{
    const ListItem = document.createElement('li');
    ListItem.setAttribute('onclick', 'selectCountry(this)');
    ListItem.innerText = country;
    CountryList.appendChild(ListItem)
})






// Create DOM Evet Function



// Create Show Country Details function
function ShowCountryDetails(){

        countryName = countryInp.value;
        const FinalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
        fetch(FinalURL)
        .then((resp)=> resp.json())
        .then((data)=>{
            result.innerHTML = `
            <img src="${data[0].flags.svg}" class="flag-img">
            <h2 class="countryNam">${data[0].name.common}</h2>

            <div class="wrapper">
                    <div class="data-wrapper">
                        <p>Capital:</p>
                    <span >${data[0].capital[0]}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Continent:</p>
                    <span >${data[0].continents[0]}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Population:</p>
                    <span >${data[0].population}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Area:</p>
                    <span >${data[0].area}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Currencies:</p>
                    <span >${data[0].currencies[Object.keys(data[0].currencies)].name}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Languages:</p>
                    <span >${Object.values(data[0].languages).toString()
                        .split(",").join(",")}</span>
                    </div>
                    <div class="data-wrapper">
                        <p>Time Zones:</p>
                    <span >${data[0].timezones[0]}</span>
                    </div>

                    <div class="data-wrapper">
                        <p>Map Link:</p>
                    <span ><a href="${data[0].maps.googleMaps}" target="_blank">click Here</a></span>
                    </div>
            </div>
            `
    console.log(data[0].maps.googleMaps);

    CountryList.style.display = 'none'

    })
    .catch(()=>{
        if(countryName.length == 0){
            result.innerHTML = `<h3>The input faild connot be empty</h3>`;
            AllCountryNameBtn.style.display = 'block'
        }else{
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
            AllCountryNameBtn.style.display = 'block'
        }
    });

    AllCountryNameBtn.style.display = 'none'
}



// Create search Countries function

function searchCountries(){
    const CountryList = document.createElement('ul');

    if(countryInp.value == ''){
        CountryList.setAttribute('class', 'Disable')
    };
   // Caught search Input and filtere country name
    const searchInput = countryInp.value.toLowerCase();
    const foundCountries = countries.filter(country => country.toLowerCase().includes(searchInput));


    if(foundCountries.length > 0){
        foundCountries.forEach(foundCountry =>{
            const ListItem = document.createElement('li');
            ListItem.textContent = foundCountry;
            ListItem.setAttribute('onclick', 'selectCountry(this)');
            console.log(ListItem);
            CountryList.appendChild(ListItem);
        });
        result.textContent = '';
        result.appendChild(CountryList)
    }else{
        result.innerHTML = `<h4>Country not found</h4>`;
    }
}



// Create  select Country function

function selectCountry(event){
    let selectData = event.textContent
    countryInp.value = selectData;
    result.textContent = '';
    CountryList.style.display = 'none'
    AllCountryNameBtn.style.display = 'none'

    ShowCountryDetails()
}
