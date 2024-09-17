const mongoose = require('mongoose');

// Definindo o esquema do livro
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    pages: { type: Number, required: true }
});

// Criando o modelo de livro a partir do esquema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
