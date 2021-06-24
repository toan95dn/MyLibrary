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

        //
        if (this.isRead === 'Yes') {
            newBookGraphic.classList.add('isRead');
        }

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

        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add('material-icons', 'readStatusButton');
        readStatusButton.classList.add('material-icons', 'readStatusButton');
        readStatusButton.innerText = this.isRead === 'Yes' ? 'visibility' : 'visibility_off';
        let currBook = this;
        readStatusButton.addEventListener('click', (event) => {
            if (event.target.innerText === 'visibility') {
                event.target.classList.add('notRead');
                newBookGraphic.classList.remove('isRead');
                event.target.innerText = 'visibility_off';
                currBook.isRead = 'No';
                library.decreaseNumBooksRead();
            }
            else {
                event.target.classList.remove('notRead');
                newBookGraphic.classList.add('isRead');
                event.target.innerText = 'visibility';
                currBook.isRead = 'Yes';
                library.increaseNumBooksRead();
            }
        })


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('material-icons', 'deleteButton');
        deleteButton.innerText = 'clear';
        deleteButton.addEventListener('click', () => {
            library.removeBook(this);
        });

        //Add info to the newbook card
        newBookGraphic.appendChild(titleGraphic);
        newBookGraphic.appendChild(authorGraphic);
        newBookGraphic.appendChild(numPagesGraphic);
        newBookGraphic.appendChild(languageGraphic);
        newBookGraphic.appendChild(dateGraphic);
        newBookGraphic.appendChild(deleteButton);
        newBookGraphic.appendChild(readStatusButton);

        return newBookGraphic;
    }
}

class Log {
    constructor() {
        this.createLogGraphic(); // container that contain all total book, books read/not read
    }

    createLogGraphic() {
        let logGraphic = document.querySelector('.log');

        this.totalBooksGraphic = document.createElement('span');
        this.numBooksReadGraphic = document.createElement('span');
        this.numBooksNotReadGraphic = document.createElement('span');

        this.updateLogGraphic(0, 0, 0);

        logGraphic.appendChild(this.totalBooksGraphic);
        logGraphic.appendChild(this.numBooksReadGraphic);
        logGraphic.appendChild(this.numBooksNotReadGraphic);

    }

    updateLogGraphic(totalBooks, booksRead, booksNotRead) {
        this.totalBooksGraphic.innerText = 'Total books: ' + totalBooks;
        this.numBooksReadGraphic.innerText = 'Read: ' + booksRead;
        this.numBooksNotReadGraphic.innerText = 'Not read: ' + booksNotRead;
    }
}

class Library { ////////////USE BOOKS.SIZE()
    constructor() {
        this.numBooks = 0;
        this.readBooks = 0;
        this.books = [];
        this.log = new Log();
        this.libraryGraphic = document.querySelector('.books'); // this contains all graphic books (cards show on screen ) 
    }

    increaseNumBooksRead() {
        this.readBooks++;
        this.log.updateLogGraphic(this.numBooks, this.readBooks, this.numBooks - this.readBooks);
    }

    decreaseNumBooksRead() {
        this.readBooks--;
        this.log.updateLogGraphic(this.numBooks, this.readBooks, this.numBooks - this.readBooks);
    }
    increaseNumBooks() {
        this.numBooks++;
        this.log.updateLogGraphic(this.numBooks, this.readBooks, this.numBooks - this.readBooks);
    }
    decreaseNumBooks() {
        this.numBooks--;
        this.log.updateLogGraphic(this.numBooks, this.readBooks, this.numBooks - this.readBooks);
    }

    addBook(title, author, numPages, language, publishingDate, isRead) {
        let newBook = new Book(title, author, numPages, language, publishingDate, isRead, this);
        this.books.push(newBook);//add book
        this.libraryGraphic.appendChild(newBook.bookGraphic);//add book graphic
        this.increaseNumBooks();
        if (isRead === 'Yes') {
            this.increaseNumBooksRead();
        }
    }

    removeBook(book) {
        //remove book in array and book graphic
        this.books.splice(this.books.indexOf(book), 1);
        book.bookGraphic.remove();

        this.decreaseNumBooks();
        if (book.isRead === 'Yes') {
            this.decreaseNumBooksRead();
        } //update the log
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
    popupBackGround.style.visibility = 'hidden';
})

// Storage
local