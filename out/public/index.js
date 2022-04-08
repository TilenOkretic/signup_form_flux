

let whyBtn = document.querySelector('#why-btn');
let faqBtn = document.querySelector('#faq-btn');
let backBtn = document.querySelector('#back-btn');
let promoYesBtn = document.querySelector('#promo-yes-btn');
let promoNoBtn = document.querySelector('#promo-no-btn');
let form = document.querySelector('#signup-form-form');

whyBtn ? whyBtn.addEventListener('click', () => {
    document.querySelector('#why-p').style.display == 'none' ? 
        document.querySelector('#why-p').style.display = '':
        document.querySelector('#why-p').style.display = 'none';
}) : '';

faqBtn ? faqBtn.addEventListener('click', () => {
    window.location.href += '/faq.html';
    window.location = window.location.origin + '/faq.html';
}) : '';

backBtn ? backBtn.addEventListener('click', () => {
    window.location.href = window.location.href.replace('/faq.html', '/');
}) : '';

promoYesBtn ? promoYesBtn.addEventListener('click', async () => {
    if(!document.getElementById('option-country')){
        let countriesDropDown = await createCountriesDropDown('Location');
        document.querySelector('#form-name-input').after(countriesDropDown);
    }

    document.querySelector('#signup-form').style.display = '';
    promoNoBtn.style.display = ''; 
}): '';

promoNoBtn ? promoNoBtn.addEventListener('click', () => {
    document.querySelector('#signup-form').style.display = 'none'; 
    promoNoBtn.style.display = 'none'; 
}): '';

form ? form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let dataJSON = buildDataJSON(form[0], form[1]);
    let req = await fetch('http://localhost:5555/', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataJSON)
    });
    let res = await req.json();
    console.log('Response status:', res);
}) : '';

let getSelectionByTag = (tag) => {
    let selection;
    document.getElementsByName(tag).forEach(e => {
        if (e.checked) selection = e;
    });
    return selection.title;
};

let buildDataJSON = (name, location) => {
    return {
        name: name.value.toLowerCase(),
        location: location.value.toLowerCase(),
        motorType: getSelectionByTag('mType'),
        skill: getSelectionByTag('skill'),
    };
};
