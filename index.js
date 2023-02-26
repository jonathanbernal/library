const bookShelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.add-book-btn');
const showAllBooksButton = document.querySelector('.show-all-books-btn');

   
const bookLibrary = [];

class Book {
    constructor(title, author, isRead) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
}

function addBookToLibrary(bookToAdd) {
    if (!(bookToAdd instanceof Book))
        throw new Error('on addBookToLibrary(). Provided argument is not a Book');
    
    bookLibrary.push(bookToAdd);
}

function displayBooks() { 
    bookLibrary.map((book) => {
        const bookNode = document.createElement('div');
        bookNode.classList.add('book');

        const bookInfoNode = document.createElement('div');
        bookInfoNode.classList.add('book-info');
        bookNode.appendChild(bookInfoNode);

        const bookTitleNode = document.createElement('h2');
        bookTitleNode.classList.add('book-title');
        bookTitleNode.textContent = book.title;
        bookInfoNode.appendChild(bookTitleNode);

        const bookAuthorNode = document.createElement('p');
        bookAuthorNode.classList.add('book-author');
        bookAuthorNode.textContent = book.author;
        bookInfoNode.appendChild(bookAuthorNode);

        const bookReadButton = document.createElement('button');
        // Default values for the button
        bookReadButton.setAttribute('value', book.isRead);
        bookReadButton.textContent = book.isRead ? 'Read' : 'Unread';
        // Update button values upon clicking on the Read/Unread button
        bookReadButton.addEventListener('click', () => {
            book.isRead = !book.isRead;
            bookReadButton.setAttribute('value', book.isRead);
            bookReadButton.textContent = book.isRead ? 'Read' : 'Unread';
        });
        bookInfoNode.appendChild(bookReadButton);

        return bookShelf.appendChild(bookNode);
    });
}

showAllBooksButton.addEventListener('click', ()=> displayBooks());

addBookButton.addEventListener('click', () => {
    
});
