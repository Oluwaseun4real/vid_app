const express = require('express')
const router = express.Router()
const moviesSchema = require('../models/Movies')
const movies = require('../models/Movies')
const {StatusCodes} = require('http-status-codes')

router.get('/',  async (req, res) => {
    try {
        const movies = await movieSchemas.find()

        if (movies.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "No movies found"})
            return 
        }
         res.status(StatusCodes.OK).json({ movies })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, numberInStock, dailyRentalRate } = req.body 

        if (!title || !numberInStock || !dailyRentalRate) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are mandatory"})
        }

        const newMovie = await movieSchemas.create({title, numberInStock, dailyRentalRate})
        res.status(StatusCodes.CREATED).json({ message: "Movie created successfully",newMovie })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
})

router.put('/:id',async (req, res) => {
    try {
         const { id } = req.params

        if (!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const movie = await movieSchemas.findOne({ _id : id })

        if (!movie) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Movie not found"})
        }

        const {title, numberInStock, dailyRentalRate} = req.body
        const updatedMovie = await movieSchemas.updateOne({_id: movie.id}, {title, numberInStock, dailyRentalRate})

        res.status(StatusCodes.OK).json({message: "Movie updated successfully", updatedMovie})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid request"})
    }
})


router.delete('/', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const deletedMovie = await movieSchemas.deleteOne({ _id : id })

        if (!deletedMovie) {
            res.status(StatusCodes.NOT_FOUND).json({message: "This Movie doesn't exist or might have already been deleted"})
        }

        res.status(StatusCodes.OK).json({message:  "Operaion successful"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
})


module.exports = router

 