let BASE_UTL = 'https://restcountries.com';

let getAllCountries = async () => {

    let url = `${BASE_UTL}/v3.1/all`;
    
    let req = await fetch(url);
    let data = await req.json();

    let clist = [];
    data.forEach(element => {
        clist.push(element.name.official);
    });

    return clist;
};

let getCountryNameFromCountryCode = async (code) => {
    let url = `${BASE_UTL}/v3.1/alpha/${code}`;
    
    let req = await fetch(url);
    let data = await req.json();

    return data[0].name.official;
};

let getCountryFromCountryName = async (name) => {
    let aName = name.split(' ');
    let uName = '';
    aName.forEach(e => {
        uName += e.charAt(0).toUpperCase() + e.slice(1);
    });
    
    let url = `${BASE_UTL}/v3.1/name/${uName}`;
    let req = await fetch(url);
    let data = await req.json();

    return data[0];
};

let getCountryCodeFromCountryName = async (name) => await getCountryFromCountryName(name);

let isValidCountry = async (countryName) => {
    let all = await getAllCountries();
    return all.includes(countryName);
};

let createElement = (type, id) => {
    let o = document.createElement(type);
    o.id = id;
    return o;
};

let addClassToDOM = (dom, cls) => {
    if (!dom || !cls) return;
    dom.classList.add(cls);
    return true;
};
let createCountriesDropDown = async (inputLabelText) => {

    let wrapper = createElement('div', 'option-country');
    
    let inputLabel = createElement('label', 'option-country-input-label'); 
    inputLabel.textContent = `${inputLabelText}:`;
    inputLabel.for = 'location';

    let input = createElement('input', 'option-country-input');
    input.setAttribute('list', 'countries-datalist');
    input.setAttribute('required', true);
    input.value = await getCountryNameFromCountryCode('si');
    
    let ddm = createElement('datalist', 'countries-datalist');
    
    let validCountries = await getAllCountries();
    
    validCountries.forEach(element => {
        let opt = document.createElement('option');
        addClassToDOM(opt, 'w-100');
        opt.value = element;
        // opt.textContent = element;
        ddm.appendChild(opt);
    });
    
    ddm.addEventListener('change', () => {
        ddm.title = ddm.value;
    });
    
    wrapper.appendChild(inputLabel);
    wrapper.appendChild(input);
    wrapper.appendChild(ddm);
    
    return wrapper;
};
