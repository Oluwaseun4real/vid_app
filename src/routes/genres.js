const express = require('express')
const router = express.Router()
const genresSchema = require('../models/Genres')
const genres = require('../models/Genres')
const {StatusCodes} = require('http-status-codes')

router.get('/',async (res, req) => {
    try {
        const genres = await genreSchema.find().sort("name")

        if (genres.length === 0) {
           return res.status(StatusCodes.NOT_FOUND).json({message: "Not found"})
        }

        for (let i = 0; i < genres.length; i++) {
            await genres[i].populate("movies", { title: 1, _id:0 })
        }
        res.status(StatusCodes.OK).json({ genres }) 
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
 })


 router.post('/', async (res, req) =>{
    try {
      const { name}  = req.body
        if(!name){
            res.status(StatusCodes.BAD_REQUEST).json({message:'All fields are mandatory'})
        }
        const createdGenres = await genresSchema.create({ name })
        res.status(StatusCodes.CREATED).json({createdCustomer})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Internal server error'})
    }
})


router.put('/:id',  async (req, res) => {
    try {
        const { id } = req.params

        if(!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide genre ID"})
        }

        const genre = await genreSchema.findOne({ _id:id })

        if (!genre) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "The requested genre doesn't exist"})
        }

        const {name} = req.body
        await genreSchema.updateOne({_id:genre.id}, {name})

        res.status(StatusCodes.OK).json({message: "opreration successful"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
})


router.delete(':id',  async (req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide ID"})
        }

        const genre = await genreSchema.findOne({_id : id})
        await genreSchema.deleteOne(genre)
        res.status(StatusCodes.OK).json({message: "Opeartion successful"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params 

        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide movie ID"})
        }

        const genre = await genreSchema.findOne({ _id : id})

        if (!genre) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Genre not found"})
        }
        
        await genre.populate("movies", {title: 1})
        res.status(StatusCodes.OK).json({genre})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server cannot process your request at this time"})
    }
})


module.exports = router

