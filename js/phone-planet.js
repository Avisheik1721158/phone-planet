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
    // console.log(data)


    // 20 cards sliced
    const slice = data.slice(0, 20)
    // console.log(slice);
    const searchResult = document.getElementById('search-result')
    // search result error handling
    if (data.length - 1 == -1) {

        const div1 = document.createElement('div')
        div1.classList.add('col')


        div1.innerHTML = `  
        <div class="card  text-white bg-danger mb-3 mx-auto w-50 mt-4 " style="max-width: 18rem;">
        <button type="button" class="btn-close" aria-label="Close"></button>
        <div class="card-header">Ooops!!</div>
        <div class="card-body">
          <h5 class="card-title">Try Again!</h5>
          <p class="card-text">Your result is not match to our result!</p>
        </div>
      </div>

           `
        searchResult.appendChild(div1)

    }

    slice.forEach(data => {
        // console.log(data)



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
    // console.log(slug)
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = data => {
    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    console.log(data)
    // console.log(data.mainFeatures.storage)
    div.classList.add('card');
    div.innerHTML = `
    
        <div class="card-body">
             <h5 class="card-title"></h5>
             <img class="w-50 mx-auto" src="${data.image}" class="card-img-top" alt="...">
        <p class="card-text"><h2 class="fs-5"> Main Features: </h2> 
        <p>  ${data.releaseDate}
        <p>  ${data.releaseDate ? '' : ' Release Date: Not Found '}

                       
            <p> Brand Name: ${data.slug}</p >
        <p> Storage:    ${data.mainFeatures.storage} </p>   
        <p> Display:   ${data.mainFeatures.displaySize} </p> 
        <p> Chip Set:   ${data.mainFeatures.chipSet}</p> 
        <p> Memory:     ${data.mainFeatures.memory}</p>
        <p> Sensors:    ${data.mainFeatures.sensors} </p>
            
        <p> Others:     ${data?.others?.WLAN ? data.others.WLAN : ' has not updated yet'},
                        ${data?.others?.Bluetooth ? data.others.Bluetooth : ''}, 
                        ${data?.others?.GPS ? data.others.GPS : ''}, 
                        ${data?.others?.NFC ? data.others.NFC : ''},
                        ${data?.others?.Radio ? data.others.Radio : ''},
                        ${data?.others?.USB ? data.others.USB : ''} </p>
         
        </div >
    `
    phoneDetails.appendChild(div)

}

// show more option
