const bookShelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.add-book-btn');
const showAllBooksButton = document.querySelector('.show-all-books-btn');

let booksInLibraryCount = 0;
let totalBooksRead = 0;
let totalBooksUnread = 0;
   
const bookLibrary = [];

class Book {
    constructor(title, author, isRead) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
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

function addBookToLibrary(bookToAdd) {

    if (!(bookToAdd instanceof Book))
        throw new Error('on addBookToLibrary(). Provided argument is not a Book');
    
    bookLibrary.push(bookToAdd);
}

function displayBooks() {
    bookLibrary.map((book) => {
        const bookElement = createDivElement(null, null, 'book');

        const bookInfoElement = createDivElement(null, null, 'book-info');
        bookElement.appendChild(bookInfoElement);

        const bookTitleElement = createHeadingElement('h2', book.title);
        const bookAuthorElement = createParagraphElement(book.author, null, 'book-author');
        bookInfoElement.append(bookTitleElement, bookAuthorElement);

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
        bookInfoElement.appendChild(bookReadButton);

        return bookShelf.appendChild(bookElement);
    });
}

function displayAddBookDialog() {
    const addBookDialog = createAddBookDialogElement();
    const bookForm = createBookFormElement();
    const bookTitle = createInputElement('text', 'title', 'Book Title', 'book-title');
    const bookAuthor = createInputElement('text', 'author', 'Book Author', 'book-author');

    bookForm.append(bookTitle, bookAuthor); 

    const readLabel =  createLabelElementWithForAttribute('Read?', 
        'radio-input-container');
    
    const radioInputContainer = createDivElement(null, 'radio-input-container', 'radio-input-container');

    const yesLabel = createLabelElementWithForAttribute('Yes', 'read-yes');
    const radioInputYes = createRadioInputElement('read', 'yes', 'read-yes');
    // make yes be selected by default
    radioInputYes.setAttribute('checked', 'checked');
    const noLabel = createLabelElementWithForAttribute('No', 'read-no');
    const radioInputNo = createRadioInputElement('read', 'no', 'read-no');

    // Prepend the radio buttons to show the label text after the buttons
    yesLabel.prepend(radioInputYes);
    noLabel.prepend(radioInputNo);

    radioInputContainer.append(readLabel, yesLabel, noLabel);

    bookForm.append(radioInputContainer);

    const dialogButtonContainer = createDivElement(null, null, 'dialog-btn-container');
    
    const addBookToLibraryButton = createButtonElement('Add Book', 'submit', 'btn');
    addBookToLibraryButton.addEventListener('click', (event) => {
        event.preventDefault(); // do not send form data as a GET/POST request
        // log parsed data
        const radioReadElements = document.getElementsByName('read');
        const radioReadValue = Array.from(radioReadElements).find(radioChoice => radioChoice.checked);
        
        const bookObject = new Book(bookTitle.value, bookAuthor.value, radioReadValue.value);
        bookLibrary.push(bookObject);
        // close right after adding the book
        addBookDialog.close();
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
