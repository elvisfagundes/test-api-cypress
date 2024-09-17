const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Rota para cadastro de livros
router.post('/books', async (req, res) => {
    const { title, author, publisher, publicationYear, pages } = req.body;
    if (!title || !author || !publisher || !publicationYear || !pages) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const book = new Book({ title, author, publisher, publicationYear, pages });
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(500).send('Erro ao cadastrar livro.');
    }
});

// Rota para listagem de livros
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send('Erro ao listar livros.');
    }
});

// Rota para consulta de livro por ID
router.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send('Livro não encontrado.');
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send('Erro ao consultar livro.');
    }
});

// Rota para remoção de livro
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Livro não encontrado.');
        }
        res.status(200).send('Livro removido com sucesso.');
    } catch (err) {
        res.status(500).send('Erro ao remover livro.');
    }
});

module.exports = router;
