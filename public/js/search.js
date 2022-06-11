function search() {
  const val = document.getElementById("searchInput").value
  $('#container').empty();
  let cardContainer = `<div class= "row my-5" id="searchContainer">
  </div>`
  $('#container').append(cardContainer);
  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'amazon-kindle-scraper.p.rapidapi.com',
        'X-RapidAPI-Key': '91a39404b6msha23bfad00fea784p172fd8jsn2f19e9df0ae8'
    }
};

fetch(`https://amazon-kindle-scraper.p.rapidapi.com/search/${val}?api_key=bc09e263d60d1bbdfc2455c657c5e9bd`, options)
    // fetch('/api/categories/classic')
    .then(response => response.json())
    .then(books => {
        console.log(books)
       
        // Create the book cards
        books.results.forEach((book) => {
            if(book.price ===null){
                var price = "Not in Stock"
            }else{
              var price = "Price:"+book.price;
            }
            // data-toggle="modal" data-target="#bookModal"
            let card = `
            
        <div class="col-2" >
            <img src="${book.image}" class="card-img-top h-50" alt="${book.name} book image" />
            <div class="card-body" style="height:140px;">
                <h6 class="card-title overflow-auto" style="height:50px;">${book.name}</h5>
                <p class="card-text">
                 ${price}
                </p>
            </div>
            <button type="button" class="btn btn-primary w-100" id="addToCart" title="${book.name}" price="${book.price}">
            Add to cart
          </button>
          </div>
        </div>
        `;
           
            $('#searchContainer').append(card);
        });
    
    })
    .catch(err => console.error(err));

  
  }
  
  document.querySelector('#search').addEventListener('click', search);