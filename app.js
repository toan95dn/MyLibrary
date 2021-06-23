class Book {
    constructor(title, author, numPages, language, publishingDate, isRead, library) {
        this.library = library; // every book will point to the same library
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.language = language;
        this.publishingDate = publishingDate;
        this.isRead = isRead;
        this.bookGraphic = this.createBookGraphic(); //the graphic is what show on the screen
    }

    createBookGraphic() {
        const newBookGraphic = document.createElement('div');
        newBookGraphic.classList.add('book');

        //Create and add all infomation of the book
        const titleGraphic = document.createElement('h1');
        titleGraphic.innerText = this.title;

        const authorGraphic = document.createElement('span');
        authorGraphic.innerText = 'Author:' + this.author;

        const numPagesGraphic = document.createElement('span');
        numPagesGraphic.innerText = 'Number of pages: ' + this.numPages;

        const languageGraphic = document.createElement('span');
        languageGraphic.innerText = "Language: " + this.language;

        const dateGraphic = document.createElement('span');
        dateGraphic.innerText = "Publishing Date: " + this.publishingDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "X";
        deleteButton.addEventListener('click', () => {
            newBookGraphic.remove();
        });


        //Add info to the newbook card
        newBookGraphic.appendChild(titleGraphic);
        newBookGraphic.appendChild(authorGraphic);
        newBookGraphic.appendChild(numPagesGraphic);
        newBookGraphic.appendChild(languageGraphic);
        newBookGraphic.appendChild(dateGraphic);
        newBookGraphic.appendChild(deleteButton);

        return newBookGraphic;
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
        this.books.push(newBook);//add book
        this.libraryGraphic.appendChild(newBook.bookGraphic);//add book graphic
        this.numBooks++;
    }

    removeBook(book) {
        this.numBooks--;
        this.books.splice(this.books.indexOf(book), 1);
    }
}


let library = new Library();

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
    library.addBook(bookTitleInput.value, authorInput.value, numPagesInput.value, languageInput.value, dateInput.value, statusInput.value);
})