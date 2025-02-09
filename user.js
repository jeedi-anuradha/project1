async function fetchData() {
    try {
        let res = await fetch("https://rust-shocking-composer.glitch.me/books")
        if (!res.ok) {
            throw new Error(res.status, res.statusText);

        }
        let books = await res.json()
        localStorage.setItem('books',JSON.stringify(books))
        displayData(books)
    } catch (error) {
        console.error(error)
    }
}
function displayData(books){
    let container = document.getElementsByClassName('main-container')[0];
    container.innerHTML=``;
    books.forEach(book => {
        let item = document.createElement('div')
        item.innerHTML = `
    <img src=${book.bookImage}>
    <h3>${book.bookTitle}</h3>
    <p>Author<br/>${book.bookAuthor}</p>`
        container.appendChild(item)
    })
}
function displayCategories(){
    let books=JSON.parse(localStorage.getItem("books"));
    let category=books.map(product=>product.bookCategory)
    let set=new Set(category)
    let categoryArr=Array.from(set);
    let btncontainer=document.getElementById('catgories');
    let catHeading=document.createElement('h3')
    catHeading.innerText='Categories'
    btncontainer.appendChild(catHeading);
    categoryArr.forEach(category=>{
        let button=document.createElement('button');
        button.textContent=category;
        button.onclick=()=>{
            filterData(category);
        }

        btncontainer.appendChild(button);
    })
}
function bestSeller() {
    let bestSellar = document.getElementById('best-seller');
    let rankHead=document.createElement('h3');
    rankHead.innerText='Best seller';
    bestSellar.appendChild(rankHead)
    let books = JSON.parse(localStorage.getItem("books"));
    books.forEach(book => {
        for (let key in book) {
            if (book[key] == 1) {
                let rankItem = document.createElement('div')
                rankItem.innerHTML =` 
                <img src=${book.bookImage}>
                <h3>${book.bookTitle}</h3>
                <p>Author<br/>${book.bookAuthor}</p>`
                bestSellar.appendChild(rankItem)
            }
        }
    })
}
function newArrivels(){
    let newArrivels = document.getElementById('new-arrivels');
    let newHead=document.createElement('h3');
    newHead.innerText='New Arrivels';
    newArrivels.appendChild(newHead)
    let books = JSON.parse(localStorage.getItem("books"));
    books.forEach(book => {
        for (let key in book) {
            if (book[key] === 2024) {
                let newItem = document.createElement('div')
                newItem.innerHTML =` 
                <img src=${book.bookImage}>
                <h3>${book.bookTitle}</h3>
                <p>Author<br/>${book.bookAuthor}</p>`
                newArrivels.appendChild(newItem)
            }
        }
    })
}
function trending(){
    let trend = document.getElementById('trend');
    let trendHead=document.createElement('h3');
    trendHead.innerText='Trending';
    trend.appendChild(trendHead)
    let books = JSON.parse(localStorage.getItem("books"));
    books.forEach(book => {
        for (let key in book) {
            if (book[key] === 'Romance') {
                let trendItem = document.createElement('div')
                trendItem.innerHTML =` 
                <img src=${book.bookImage}>
                <h3>${book.bookTitle}</h3>
                <p>Author<br/>${book.bookAuthor}</p>`
                trend.appendChild(trendItem)
            }
        }
    })
} 
function filterData(category){
    let books=JSON.parse(localStorage.getItem('books')) || []
    let filterCategory=books.filter(book=>book.bookCategory==category)
    displayData(filterCategory)
}
window.onload = () => {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (books.length === 0) {
        fetchData();
    }
    else {
        displayData(books);
        displayCategories();
        // bestSeller();
        // newArrivels();
        // trending()
    }
}
document.getElementById('search').addEventListener('input',function(e){
    let value=e.target.value.toLowerCase();
    let books=JSON.parse(localStorage.getItem('books'))
    let filteredBooks=books.filter(book=>{
        return book.bookCategory.toLowerCase().includes(value) ||
                book.bookAuthor.toLowerCase().includes(value)||
                book.bookTitle.toLowerCase().includes(value)
    });
    displayData(filteredBooks)
})
function displayData(books){
    let mainContainer=document.getElementById('main-container');
    mainContainer.innerHTML=``

    if(books.length==0){
        let noResult=document.createElement('div')
        noResult.innerText='no books found based on your search';
        mainContainer.appendChild(noResult)
        return;
    }
    books.forEach(book => {
        let item = document.createElement('div');
        item.innerHTML = `
           <img src=${book.bookImage}>
    <h3>${book.bookTitle}</h3>
    <p>Author<br/>${book.bookAuthor}</p>
        `;
        mainContainer.appendChild(item);
    });
}