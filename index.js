import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import axios from "axios"
import.meta.dirname;
import.meta.filename;
import methodOverride from 'method-override'
import env from "dotenv";

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

var current_directory = import.meta.dirname;

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(current_directory + "/public"));
app.use(methodOverride('_method'));

app.get("/", async(req, res) => {
    let result = await db.query("SELECT * from list_of_books");
    res.render("Main Page.ejs", {
        books : result.rows
    });
})

app.get("/insert", async(req,res) =>{
    res.render("Insert Page.ejs", {
        type : "insert"
    });
})

app.post("/insert", async(req, res) => {
    let sended_book = req.body;

    let key = "isbn";
    let value = sended_book.isbn;
    let size = 'M';
    let sended_book_image= `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

    const [sended_book_title, sended_book_author] = sended_book.title_author.split(' - ');

    sended_book.isbn = parseInt(sended_book.isbn);
    sended_book.date_read = new Date(sended_book.date_read);
    sended_book.rating = parseInt(sended_book.rating);

    await db.query(`
        INSERT INTO list_of_books (title, author, isbn_number, date_read, rating, synopsis, personal_notes, image) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
            sended_book_title, 
            sended_book_author, 
            sended_book.isbn, 
            sended_book.date_read, 
            sended_book.rating, 
            sended_book.synopsis, 
            sended_book.notes,
            sended_book_image
        ]
    );
 
    res.redirect("/");
});

app.post("/remove", async(req, res) =>{
    let current_book_id = await req.body.id;
    
    try {
        await db.query(`DELETE FROM list_of_books WHERE id = $1`, [current_book_id]);
        console.log("Books successfully deleted");
    } catch (error) {
        console.log(error);
    }
    res.redirect("/")
});

app.post("/", async(req, res) =>{
    let result = await db.query("SELECT * from list_of_books");
    let current_book_id = req.body.id;
    let book;

    result.rows.forEach((current_book) => {
        if(current_book.id == current_book_id){
            book = current_book;
            return
        }       
    });
    
    res.render("Insert Page.ejs", {
        type : "edit",
        book : book
    });
})

app.post("/edit", async(req, res)=> {
    let current_book_id = req.body.id;
    let [current_book_title, current_book_author] = req.body.title_author.split(' - ');
    let current_book_date = new Date(req.body.date_read);
    let current_book_rating = parseInt(req.body.rating);
    let current_book_synopsis = req.body.synopsis;
    let current_book_notes = req.body.notes;

    try {
        await db.query(`
            UPDATE list_of_books
            SET title = $1,
                author = $2,
                date_read = $3,
                rating = $4,
                synopsis = $5,
                personal_notes = $6
            WHERE id = $7;
        `, [
            current_book_title,
            current_book_author,
            current_book_date,
            current_book_rating,
            current_book_synopsis,
            current_book_notes,
            current_book_id
        ])
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
})

app.get("/book-information", async(req,res) => {
    let result = await db.query("SELECT * from list_of_books");
    let current_book_id = req.query.id;
    let book;

    result.rows.forEach((current_book) => {
        if(current_book.id == current_book_id){
            book = current_book;
            return
        }       
    });

    console.log(current_book_id);
    
    res.render("Book Information Page.ejs", {
        book : book
    })
})

app.listen(port, async() => {
    console.log(`App is listening on port ${port}.`)
})