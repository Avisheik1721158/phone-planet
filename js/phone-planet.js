// search Field
const searchPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;

    // console.log(searchText)
    searchField.value = ''

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
const displaySearchResult = data => {
    const slice = data.slice(0, 20)
    console.log(slice);
    const searchResult = document.getElementById('search-result')

    slice.forEach(data => {
        // console.log(data)
        console.log(data)

        const div = document.createElement('div');

        div.classList.add('col')


        div.innerHTML = `  
        
        <div  class="card h-100 mt-5">
          <img class="w-50 mx-auto " src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">${data.brand}</p>
            <button onclick="loadPhonedetail('${data.slug}')" class="btn btn-success">Details</button>
          </div>
        </div>
       
       `
        searchResult.appendChild(div)


    })

}
// phone details
const loadPhonedetail = slug => {
    console.log(slug)
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = data => {
    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
    
        <div class="card-body">
             <h5 class="card-title"></h5>
             <img class="w-50 mx-auto " src="${data.image}" class="card-img-top" alt="...">
        <p class="card-text"><h2 class="fs-5"> Main Features: </h2><p> Release Date:${data.releaseDate ? releaseDate : ' No Release date  found '}  <p> Brand Name: ${data.slug}</p>
        <p> Storage: ${data.mainFeatures.storage} </p>   <p>  Display: ${data.mainFeatures.displaySize} </p> <p> Chip Set: ${data.mainFeatures.chipSet}</p> <p> Memory: ${data.mainFeatures.memory}</p>
        <p> Sensors: ${data.mainFeatures.sensors} </p>
        <p> Others: ${data.others.WLAN}, ${data.others.Bluetooth}, ${data.others.GPS}, ${data.others.NFC},
        ${data.others.NFC}, ${data.others.Radio}, ${data.others.USB} </p>
        </div >
    `
    phoneDetails.appendChild(div)
}