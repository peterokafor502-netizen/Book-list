// Book Class: Represent a Book
class book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks () {    
    const books = store.getbook () ;

        books.forEach((book) => UI.addbookTolist(book));
    }

    static addbooktolist(book) {
        const list = document.querySelector(book-list);

        const row = document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook (el) {
        if(el.classlist.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showalert (message, classname) {
        const div = document.createComment('div');
        div.classname = 'alert alert-${classname}';
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout (() => document.querySelector('.alert').remove(),3000);
    }

    static clearfields () {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Storage Class: Handle Storage
class store {
    static getbook () {
    let books;
    if(localStorage.getItem('books') === null) {
       books = [];
      }else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }

    static addbook(book) {
        const books = Store.getBooks();
        books.push(book);
       localStorage.setItem('books', JSON.stringify(books));
    }

    static removebook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display a Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e) => {
    // Prevent actual submit
    e.preventDefault();

//get form values
const title = document.querySelector('#title').Value
const author = document.querySelector('#author').Value
const isbn = document.querySelector('#isbn').Value

// Validate
if(title === '' || author === '' || isbn === '') {
    UI,showAlert('please fill in all fields', 'danger')
} else {
    // Instantiate book
const book = new Book(title, author, isbn);

 // Add Book to UI
 UI.addbooktolist(book);

 // Add Book to store
 store.addbook(book);

 //Show success message
 UI.showAlert('Book Added', 'sucess')

 // Clear Fields
  UI.clearfields();
}
} );
 
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=> {
    // Remove Book from UI
    UI.deleteBook(e.target);

      // Remove Book from store
      store.removebook(e.target.parentElement.parentElementsibling.textcontent);

    //Show success message
 UI.showAlert('Book Removed', 'sucess')
});