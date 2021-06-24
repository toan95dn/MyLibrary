//Library log---------------------------------------------------------------------------------
class LibraryLogModel {
    constructor() {
        this.books = [];
        this.readBook = 0;
    }

    addBook(book) {
        this.books.push(book);
        if (book.isRead === 'Yes') {
            this.readBook++;
        }
    }

    removeBook(book) {
        if (book.isRead === 'Yes') {
            this.readBook--;
        }
        this.books.splice(this.books.indexOf(book), 1);
    }

    getTotalBooks() {
        return this.books.length;
    }

    getTotalReadBooks() {
        return this.readBook;
    }

    getTotalUnreadBooks() {
        return this.books.length - this.readBook;
    }

    updateNumReadBooks(readStatus) {
        if (readStatus === 'Yes') {
            this.readBook++;
        }
        else {
            this.readBook--;
        }
    }
}

class LibraryLogView {
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

let libraryLogView = new LibraryLogView();
let librayLogModel = new LibraryLogModel();
//---------------------------------------------------------------------------------Library log

//Book------------------------------------------------------------------------------------
class Book {
    constructor(title, author, numPages, language, publishingDate, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.language = language;
        this.publishingDate = publishingDate;
        this.isRead = isRead;
    }

    changeReadStatus() {
        this.isRead = this.isRead === 'Yes' ? 'No' : 'Yes';
        return this.isRead;
    }
}

class BookView {
    constructor(title, author, numPages, language, publishingDate, isRead) {
        this.createAllViews(title, author, numPages, language, publishingDate, isRead);
    }

    createAllViews(title, author, numPages, language, publishingDate, isRead) {
        //Get the shelf
        let bookshelf = document.querySelector('.books');

        this.bookGraphic = document.createElement('div');
        this.bookGraphic.classList.add('book');

        //BOOKS INFO GRAPHIC
        const titleGraphic = document.createElement('h1');
        titleGraphic.innerText = title;

        const authorGraphic = document.createElement('span');
        authorGraphic.innerText = 'Author:' + author;

        const numPagesGraphic = document.createElement('span');
        numPagesGraphic.innerText = 'Number of pages: ' + numPages;

        const languageGraphic = document.createElement('span');
        languageGraphic.innerText = "Language: " + language;

        const dateGraphic = document.createElement('span');
        dateGraphic.innerText = "Publishing Date: " + publishingDate;

        if (isRead === 'Yes') {
            this.bookGraphic.classList.add('isRead');
        }

        //BUTTON GRAPHIC
        this.readStatusButton = document.createElement('button');
        this.readStatusButton.classList.add('material-icons', 'readStatusButton');
        this.readStatusButton.classList.add('material-icons', 'readStatusButton');
        this.setReadStatusView(isRead);


        this.deleteButton = document.createElement('button');
        this.deleteButton.classList.add('material-icons', 'deleteButton');
        this.deleteButton.innerText = 'clear';

        //Add info to the newbook card
        this.bookGraphic.appendChild(titleGraphic);
        this.bookGraphic.appendChild(authorGraphic);
        this.bookGraphic.appendChild(numPagesGraphic);
        this.bookGraphic.appendChild(languageGraphic);
        this.bookGraphic.appendChild(dateGraphic);
        this.bookGraphic.appendChild(this.deleteButton);
        this.bookGraphic.appendChild(this.readStatusButton);

        //Put the book to the shelf
        bookshelf.append(this.bookGraphic);
    }

    //Getters
    getBookGraphic() { return this.bookGraphic; }
    getReadStatusButton() { return this.readStatusButton; }
    getDeleteButton() { return this.deleteButton; }

    //Setters
    removeView() { this.bookGraphic.remove(); }
    setReadStatusView(isRead) {
        if (isRead === 'Yes') {
            this.bookGraphic.classList.add('isRead');
            this.readStatusButton.classList.remove('notRead');
            this.readStatusButton.innerText = 'visibility';
        }
        else {
            this.bookGraphic.classList.remove('isRead');
            this.readStatusButton.classList.add('notRead');
            this.readStatusButton.innerText = 'visibility_off';
        }
    }
}


class BookController {
    constructor(title, author, numPages, language, publishingDate, isRead) {
        this.model = new Book(title, author, numPages, language, publishingDate, isRead);
        this.view = new BookView(title, author, numPages, language, publishingDate, isRead);
        this.createEventsHandler();

        librayLogModel.addBook(this.model);
        libraryLogView.updateLogGraphic(librayLogModel.getTotalBooks(), librayLogModel.getTotalReadBooks(), librayLogModel.getTotalUnreadBooks());

        saveData();
    }

    createEventsHandler() {
        this.createChangeReadStatusEvent();
        this.createRemovingBookEvent();
    }

    createChangeReadStatusEvent() {
        let changeReadStatusButton = this.view.getReadStatusButton();
        changeReadStatusButton.addEventListener('click', () => {
            let currReadStatus = this.model.changeReadStatus();
            this.view.setReadStatusView(currReadStatus);
            librayLogModel.updateNumReadBooks(currReadStatus);
            libraryLogView.updateLogGraphic(librayLogModel.getTotalBooks(), librayLogModel.getTotalReadBooks(), librayLogModel.getTotalUnreadBooks());
            saveData();

        });
    }

    createRemovingBookEvent() {
        let currBook = this.model;
        let removeBookButton = this.view.getDeleteButton();
        removeBookButton.addEventListener('click', () => {
            this.view.removeView();
            librayLogModel.removeBook(currBook);
            libraryLogView.updateLogGraphic(librayLogModel.getTotalBooks(), librayLogModel.getTotalReadBooks(), librayLogModel.getTotalUnreadBooks());
            saveData();
        });
    }
}

//------------------------------------------------------------------------------------Book



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

//Addnewbook button, when add, collect all information in the form
const addNewBookButton = document.querySelector('#addNewBook');
addNewBookButton.addEventListener('click', () => {
    let allFieldWereFilled = true;
    let allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) => {
        if (input.value === '') {
            allFieldWereFilled = false;
        }
    })
    if (allFieldWereFilled) {
        new BookController(bookTitleInput.value, authorInput.value, numPagesInput.value, languageInput.value, dateInput.value, statusInput.value);
        popupBackGround.style.visibility = 'hidden';
    }
})

//Add a book button (pop up a form to enter)
const popupButton = document.querySelector("#popupButton");
popupButton.addEventListener('click', () => {
    //Show the pop up form
    let popupWindow = document.querySelector('.modal-bg');
    popupWindow.style.visibility = 'visible';
});

//---------------------------------------------------------------------------------Pop up form
function saveData() {
    localStorage.setItem('allBooks', JSON.stringify(librayLogModel.books));
}

(function restoreData() {
    if (localStorage.allBooks) {
        let books = JSON.parse(localStorage.allBooks);
        books.forEach(book => {
            new BookController(book.title, book.author, book.numPages, book.language, book.publishingDate, book.isRead);
        });
    }
    else {
        //Add a sample book
        new BookController("The Stranger", "Albert Camus", "134", "English", "1942-01-01", "Yes");
    }
})()