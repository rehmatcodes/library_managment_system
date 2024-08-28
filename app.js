// Book Class
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.isAvailable = true;
    }
  
    getDetails() {
      return `${this.title} by ${this.author} (ISBN: ${this.isbn})`;
    }
  
    borrowBook() {
      if (this.isAvailable) {
        this.isAvailable = false;
        return true;
      }
      return false;
    }
  
    returnBook() {
      this.isAvailable = true;
    }
  }
  
  // Member Class
  class Member {
    constructor(name, memberId) {
      this.name = name;
      this.memberId = memberId;
      this.borrowedBooks = [];
    }
  
    borrowBook(book) {
      if (book.borrowBook()) {
        this.borrowedBooks.push(book);
        console.log(`${this.name} borrowed "${book.title}"`);
      } else {
        console.log(`Sorry, "${book.title}" is not available.`);
      }
    }
  
    returnBook(book) {
      const index = this.borrowedBooks.indexOf(book);
      if (index !== -1) {
        this.borrowedBooks.splice(index, 1);
        book.returnBook();
        console.log(`${this.name} returned "${book.title}"`);
      } else {
        console.log(`${this.name} doesn't have "${book.title}" to return.`);
      }
    }
  
    getBorrowedBooks() {
      return this.borrowedBooks.map(book => book.getDetails());
    }
  }
  
  // Library Class
  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
      this.members = [];
    }
  
    addBook(book) {
      this.books.push(book);
    }
  
    addMember(member) {
      this.members.push(member);
    }
  
    findBook(isbn) {
      return this.books.find(book => book.isbn === isbn);
    }
  
    findMember(memberId) {
      return this.members.find(member => member.memberId === memberId);
    }
  }
  
  // Creating Books
  const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "12345");
  const book2 = new Book("1984", "George Orwell", "67890");
  const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "11223");
  
  // Creating Members
  const member1 = new Member("Alice", "A1");
  const member2 = new Member("Bob", "B1");
  
  // Creating Library
  const library = new Library("Central Library");
  
  // Adding Books and Members to Library
  library.addBook(book1);
  library.addBook(book2);
  library.addBook(book3);
  
  library.addMember(member1);
  library.addMember(member2);
  
  // Simulating the borrowing and returning of books
  member1.borrowBook(library.findBook("67890")); // Alice borrows "1984"
  member2.borrowBook(library.findBook("67890")); // Bob tries to borrow "1984" (not available)
  
  member1.returnBook(library.findBook("67890")); // Alice returns "1984"
  member2.borrowBook(library.findBook("67890")); // Bob borrows "1984"
  
  // Displaying the status of the library
  console.log("\nLibrary Status:");
  console.log(`Library Name: ${library.name}`);
  
  console.log("\nBooks:");
  library.books.forEach(book => {
    console.log(`${book.getDetails()}, Available: ${book.isAvailable ? "Yes" : "No"}`);
  });
  
  console.log("\nMembers:");
  library.members.forEach(member => {
    console.log(`Name: ${member.name}, ID: ${member.memberId}, Borrowed Books: [${member.getBorrowedBooks().join(", ")}]`);
  });
  