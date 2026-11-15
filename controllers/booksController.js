const Book = require('../models/Book');


exports.createBook = async (req, res) => {
    try {
        const { title, author, publishedYear, genre } = req.body;

        const book = await Book.create({
            title,
            author,
            publishedYear,
            genre
        });

        res.status(201).json({
            message: 'Book created successfully',
            book
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            count: books.length,
            books
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            book
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};