class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }

    displayInfo() {

    }
}

let library = [];

function addBook(title, author, numPages, isRead) {
    let newBook = new Book(title, author, numPages, isRead);
    library.push(newBook);
}

function removeBook(title) {
    library = library.filter(book => book.title !== title);
}

//Add a book button
const addBookButton = document.querySelector("#addButton");
addBookButton.addEventListener('click', () => {
    //Show the pop up form
    let popupWindow = document.querySelector('.modal-bg');
    popupWindow.style.visibility = 'visible';
});

//Pop up form
//1. Pop up background
const popupBackGround = document.querySelector('.modal-bg');
popupBackGround.addEventListener('click', (event) => {
    popupBackGround.style.visibility = 'hidden';
})

const popupForm = document.querySelector('.modal');
popupForm.addEventListener('click', (event) => {
    // console.log('shit');
    event.stopPropagation();
})

//Addnewbook button, when add, collect all information in the form