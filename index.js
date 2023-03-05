const bookShelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.add-book-btn');
const showAllBooksButton = document.querySelector('.show-all-books-btn');

let booksInLibraryCount = 0;
let totalBooksRead = 0;
let totalBooksUnread = 0;
   
let bookLibrary = [];

class Book {
    constructor(title, author, isRead) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }

    toggleRead = () => {
        this.isRead = !this.isRead;
        return this.isRead;
    }

    getIsBookRead = () => this.isRead === 'true' || this.isRead === true;
}

const incrementBooksInLibraryCount = () => booksInLibraryCount += 1;
const decrementBooksInLibraryCount = () => booksInLibraryCount -= 1;

function createAddBookDialogElement() {
    const addBookDialogElement = document.createElement('dialog');
    addBookDialogElement.classList.add('add-book-dialog');
    addBookDialogElement.id = 'add-book-dialog';

    return addBookDialogElement;
}

function createBookFormElement() {
    const bookFormElement = document.createElement('form');
    return bookFormElement;
}

function createInputElement(inputType, nameAttribute, inputPlaceholder, inputId) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', inputType);
    inputElement.setAttribute('name', nameAttribute);
    inputElement.id = inputId;
    inputElement.placeholder = inputPlaceholder;
    return inputElement;
}

function createLabelElementWithForAttribute(textContent, forId) {
    const labelWithForAttributeElement = document.createElement('label');
    labelWithForAttributeElement.setAttribute('for', `#${forId}`);
    labelWithForAttributeElement.textContent = textContent;
    return labelWithForAttributeElement;
}

function createRadioInputElement(radioInputNameAttribute, radioInputValue, radioInputId) {
    const radioInputElement = document.createElement('input');
    radioInputElement.setAttribute('type', 'radio');
    radioInputElement.setAttribute('name', radioInputNameAttribute);
    radioInputElement.value = radioInputValue;
    radioInputElement.id = radioInputId;
    return radioInputElement;
}

function createButtonElement(buttonTextContent, buttonType, ...classList) {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = buttonTextContent;
    buttonElement.setAttribute('type', buttonType);
    buttonElement.classList.add(...classList);
    return buttonElement;
}

function createDivElement(textContent, divId, ...classList) {
    const divElement = document.createElement('div');
    if (divId) {
        divElement.id = divId;
    }
    divElement.classList.add(...classList);
    return divElement;
}

function createHeadingElement(headingType, textContent, ...classList) {
    const headingElement = document.createElement(headingType);
    headingElement.textContent = textContent;
    headingElement.classList.add(...classList);
    return headingElement;
}

function createParagraphElement(textContent, paragraphId, ...classList) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = textContent;
    paragraphElement.id = paragraphId;
    paragraphElement.classList.add(...classList);
    return paragraphElement;
}

function searchForDuplicateBooks(bookToSearch) {
    if (!(bookToSearch instanceof Book))
        throw new Error('on searchForDuplicateBooks(). Provided argument is not a Book');
    // eslint-disable-next-line no-restricted-syntax, prefer-const
    for(let book of bookLibrary) {
        if(bookToSearch.title.toLowerCase() === book.title.toLowerCase()
            && bookToSearch.author.toLowerCase() === book.author.toLowerCase()) {
            return true;
        }
    }

    return false;
}

function addBookToLibrary(bookToAdd) {
    if (!(bookToAdd instanceof Book))
        throw new Error('on addBookToLibrary(). Provided argument is not a Book');
    
    bookLibrary.push(bookToAdd);
}

function deleteBookFromLibrary(bookToDelete) {
    if (!(bookToDelete instanceof Book))
        throw new Error('on deleteBookFromLibrary(). Provided argument is not a Book');

    bookLibrary = bookLibrary.filter(bookItem => bookItem !== bookToDelete);
}

function deleteBookFromBookshelfElement(bookToDelete) {
    if (!(bookToDelete instanceof HTMLDivElement)) {
        throw new Error('on deleteBookFromBookshelfElement(). Provided argument must be of tye HtmlDivElement');
    }
    return bookShelf.removeChild(bookToDelete);
}

function displayBooks() {
    bookLibrary.map((book) => {
        const bookElement = createDivElement(null, null, 'book');

        const bookInfoElement = createDivElement(null, null, 'book-info');
        bookElement.appendChild(bookInfoElement);

        const bookTitleElement = createHeadingElement('h2', book.title, 'book-title');
        const bookAuthorElement = createParagraphElement(book.author, null, 'book-author');
        bookInfoElement.append(bookTitleElement, bookAuthorElement);

        const bookButtonContainer = createDivElement(null, '', 'btn-container');

        const isBookRead = book.getIsBookRead() ? 'Read' : 'Not read';
        const bookReadButton = createButtonElement(isBookRead, 'button', 'btn');
        bookReadButton.setAttribute('value', book.getIsBookRead());
        
        // Update button values upon clicking on the Read/Unread button
        bookReadButton.addEventListener('click', () => {
            book.toggleRead();
            bookReadButton.setAttribute('value', book.getIsBookRead());
            bookReadButton.textContent = book.getIsBookRead() ? 'Read' : 'Not read';
        });

        const bookDeleteButton = createButtonElement('Delete', 'button', 'btn', 'delete');
        bookDeleteButton.addEventListener('click', () => {
            // delete book element from the bookshelf HTML element
            deleteBookFromBookshelfElement(bookElement);
            // delete book object from the book library array
            deleteBookFromLibrary(book);
        });
        bookButtonContainer.append(bookReadButton, bookDeleteButton);
        bookElement.append(bookButtonContainer);

        return bookShelf.appendChild(bookElement);
    });
}

function displayAddBookDialog() {
    const addBookDialog = createAddBookDialogElement();
    const bookForm = createBookFormElement();
    const bookTitle = createInputElement('text', 'title', 'Book Title', 'book-title');
    const bookAuthor = createInputElement('text', 'author', 'Book Author', 'book-author');

    bookForm.append(bookTitle, bookAuthor); 

    const readLabel =  createLabelElementWithForAttribute('Read?', 'radio-input-container');
    
    const radioInputContainer = createDivElement(null, 'radio-input-container', 'radio-input-container');

    const yesLabel = createLabelElementWithForAttribute('Yes', 'read-yes');
    const radioInputYes = createRadioInputElement('read', true, 'read-yes');
    // make yes be selected by default
    radioInputYes.setAttribute('checked', 'checked');
    const noLabel = createLabelElementWithForAttribute('No', 'read-no');
    const radioInputNo = createRadioInputElement('read', false, 'read-no');

    // Prepend the radio buttons to show the label text after the buttons
    yesLabel.prepend(radioInputYes);
    noLabel.prepend(radioInputNo);

    radioInputContainer.append(readLabel, yesLabel, noLabel);

    bookForm.append(radioInputContainer);

    const dialogButtonContainer = createDivElement(null, null, 'btn-container');
    
    const addBookToLibraryButton = createButtonElement('Add Book', 'submit', 'btn');
    addBookToLibraryButton.addEventListener('click', (event) => {
        event.preventDefault(); // do not send form data as a GET/POST request
        // log parsed data
        const radioReadElements = document.getElementsByName('read');
        // This variable retrieves the checked value from the two radio inputs.
        const radioReadValue = Array.from(radioReadElements)
            .find(radioChoice => radioChoice.checked).value;
        console.log(radioReadValue);
        // This variable is used to sanitize the value passed to the book object.
        // When we retrieve the value from the form, this value is returned as a string.
        // What we're doing here is converting it to a Boolean.
        const isRadioReadValue = radioReadValue === 'true';
        
        const bookObject = new Book(bookTitle.value, bookAuthor.value, isRadioReadValue);

        if(!searchForDuplicateBooks(bookObject)) { // If the book does not exist
            addBookToLibrary(bookObject);
            // close right after adding the book
            addBookDialog.close();
        } else if(! document.querySelector('#book-error-message')) {
                const addBookErrorMessageElement = createParagraphElement('Error. This book already exists.', 'book-error-message', 'error-message');
                bookForm.append(addBookErrorMessageElement);
        }
    });
    
    const cancelButton = createButtonElement('Cancel', 'button', 'btn');
    cancelButton.addEventListener('click', () => {
        addBookDialog.close();
    });

    dialogButtonContainer.append(addBookToLibraryButton, cancelButton);

    bookForm.append(dialogButtonContainer);
    addBookDialog.append(bookForm);

    // show the dialog once the dialog form has been created.
    document.body.append(addBookDialog);
    addBookDialog.showModal();
}

showAllBooksButton.addEventListener('click', ()=> displayBooks());
addBookButton.addEventListener('click', displayAddBookDialog);
