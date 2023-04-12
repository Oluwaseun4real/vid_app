const express = require('express')
const router = express.Router()
const customerSchema = require('../models/customers')
const customers = require('../models/customers')
const {StatusCodes} = require('http-status-codes')


router.get('/',async (res, req) => {
   try {
    const customers = await customerSchema.find().sort('name')
    if(!customers){
        return res.status(StatusCodes.NOT_FOUND).json({message:'No registered customers at this moment'})
    }
    res.status(StatusCodes.OK).json({customers})
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Internal server error'})
    
   }
})


router.post('/', async (req, res) =>{
    try {
      const { name, isGold, phone }  = req.body
        if(!name || !isGold || !phone){
            res.status(StatusCodes.BAD_REQUEST).json({message:'All fields are mandatory'})
        }
        const createdCustomer = await customerSchema.create({ name, isGold, phone })
        res.status(StatusCodes.CREATED).json({createdCustomer})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Internal server error'})
     
    }
})

router.put('/', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return new BadRequestError("Please provide your ID")
        }
        const customer = await customerSchema.findOne({ _id: id }) 
        if (!customer) {
            return new BadRequestError(`No customer with ID ${req.params.id} exists`)
        }
        const {name, isGold, phoneNumber} = req.body 
        const result = userSchema(req.body) 
        
        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message) 
        }
        const updateDetails = await customerSchema.updateOne({_id: customer.id},{name, isGold, phoneNumber})
        res.status(StatusCodes.OK).json({message: "Customer data updated successfully", updateDetails})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}),


router.delete('/', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            throw new BadRequestError("Please provide your ID")
        }
        const customer = await customerSchema.deleteOne({_id: id})
        if (!customer) {
            throw new BadRequestError("No such customer exists")
        }
                res.status(StatusCodes.OK).json({message: "Data deleted successfully"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}),

router.get('/',async (req, res) => {
    try {
        const { id } = req.params
             if (!id) {
            throw new BadRequestError("Please provide your ID")
        }
        const customer = await customerSchema.findById({_id : id})
             if (!customer) {
            throw new BadRequestError(`No customer with ID: ${req.params.id} exists`);
        }
        
        res.status(StatusCodes.OK).json({ customer })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message})
    }
})

module.exports = router