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
    }
}

class Library {
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
}

class BookView {
    constructor() {
        const newBookGraphic = document.createElement('div');
        newBookGraphic.classList.add('book');

        //
        if (this.isRead === 'Yes') {
            newBookGraphic.classList.add('isRead');
        }

        //Info Graphic
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

        //Buttons graphic
        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add('material-icons', 'readStatusButton');
        readStatusButton.classList.add('material-icons', 'readStatusButton');
        readStatusButton.innerText = this.isRead === 'Yes' ? 'visibility' : 'visibility_off';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('material-icons', 'deleteButton');

        //Add info to the newbook card
        newBookGraphic.appendChild(titleGraphic);
        newBookGraphic.appendChild(authorGraphic);
        newBookGraphic.appendChild(numPagesGraphic);
        newBookGraphic.appendChild(languageGraphic);
        newBookGraphic.appendChild(dateGraphic);
        newBookGraphic.appendChild(deleteButton);
        newBookGraphic.appendChild(readStatusButton);
    }




}