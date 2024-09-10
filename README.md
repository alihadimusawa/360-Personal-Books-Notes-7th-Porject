# 360++ Personal Book Notes

## Overview
**360++ Personal Book Notes** is a personal book management website that showcases all the books I (the developer) have read. The website provides a user-friendly interface for viewing notes on each book. It also features an admin login system that allows the owner to manage book entries.

## Features
- **Admin Authentication:** Only I, as the website owner, can log in as the admin. This ensures secure access to book management features. To log as an admin, i just have to input "123123" as the username and also as the password.
- **Book Management for Admin:**
  - Add new books.
  - Edit book descriptions and notes.
  - Remove books from the collection.
- **Public View for Users:**
  - Regular users can browse the books I’ve read and see the personal notes I’ve written for each book.

## How It Works
1. **Admin Login:** 
   - Click the "Login as Writer" button to authenticate.
   - Once authenticated, the admin panel is accessible to add, edit, or remove books.
   
2. **Regular User Experience:** 
   - Browse through the list of books.
   - View notes for each book, but without the ability to modify any entries.

## Installation
1. Clone the repository:  
   ```
   git clone https://github.com/your-repo/360-personal-book-notes.git
   ```
2. Install dependencies:  
   ```
   npm install
   ```

3. Run the project:  
   ```
   npm start
   ```

4. Create a "books" database in postgresql

5. Create a "list_of_books" table inside the database, the column is as shown below:  
   id serial primary key,   
   title varchar(100) not null,   
   author varchar(100) not null,    
   isbn varchar(100) not null,    
   date_read date not null,     
   rating int not null,    
   synopsis text not null,    
   notes text not null,    
   image text not null    

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: postgresql
