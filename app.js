class Book {
    constructor(title, author, numPages, language, publishingDate, isRead, library) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.language = language;
        this.publishingDate = publishingDate;
        this.isRead = isRead;
        this.bookGraphic = this.createBookView(); //the graphic is a div
        this.library = library; // every book will point to the same library
    }

    createBookGraphic() {

    }
}

class Library {
    constructor() {
        this.numBooks = 0;
        this.books = [];
        this.libraryGraphic = document.querySelector('.books'); // this contains all graphic books (cards show on screen ) 
    }

    addBook(title, author, numPages, language, publishingDate, isRead) {
        let newBook = new Book(title, author, numPages, language, publishingDate, isRead, this);
        books.push(newBook);
        numBooks++;
    }

    removeBook(book) {
        this.numBooks--;
        //1/remove the book

        //2/remove the book view
        this.libraryGraphic.removeChild(book.bookGraphic);
    }
}




let library = [];

function removeBook(title) {
    library = library.filter(book => book.title !== title);
}

//Add a book button
const popupButton = document.querySelector("#popupButton");
popupButton.addEventListener('click', () => {
    //Show the pop up form
    let popupWindow = document.querySelector('.modal-bg');
    popupWindow.style.visibility = 'visible';
});


//Pop up form-------------------------------------------------------------------------------

//All input
const bookTitleInput = document.querySelector('#BookTitle');
const authorInput = document.querySelector('#Author');
const numPagesInput = document.querySelector('#NumPages');
const languageInput = document.querySelector('#Language');
const dateInput = document.querySelector('#Date');
const statusInput = document.querySelector('#Status');

//Pop up background
const popupBackGround = document.querySelector('.modal-bg');
popupBackGround.addEventListener('click', (event) => {
    popupBackGround.style.visibility = 'hidden';
})

const popupForm = document.querySelector('.modal');
popupForm.addEventListener('click', (event) => {
    event.stopPropagation();
})

//Addnewbook button, when add, collect all information in the form----------------------------------- 
const addNewBookButton = document.querySelector('#addNewBook');
addNewBookButton.addEventListener('click', () => {
    let newBook = new Book(bookTitleInput.value, authorInput.value, numPagesInput.value, languageInput.value, dateInput.value, statusInput.value);
    library.push(newBook);
    displayNewBook(newBook);
})

//Display newbook in the library
let libraryView = document.querySelector('.books');

function displayNewBook(newBook) {
    const newBookView = document.createElement('div');
    newBookView.classList.add('book');

    //Create and add all infomation of the book
    const titleView = document.createElement('h1');
    titleView.innerText = newBook.title;
    const authorView = document.createElement('span');
    authorView.innerText = 'Author:' + newBook.author;
    const numberOfPagesView = document.createElement('span');
    numberOfPagesView.innerText = 'Number of pages: ' + newBook.numPages;
    const languageView = document.createElement('span');
    languageView.innerText = "Language: " + newBook.language;
    const dateView = document.createElement('span');
    dateView.innerText = "Publishing Date: " + newBook.publishingDate;


    //Add info to the newbook card
    newBookView.appendChild(titleView);
    newBookView.appendChild(authorView);
    newBookView.appendChild(numberOfPagesView);
    newBookView.appendChild(languageView);
    newBookView.appendChild(dateView);

    //show the new book in the library
    libraryView.appendChild(newBookView);
}
