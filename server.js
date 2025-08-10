import dotenv from "dotenv"
import express from "express"
import schoolRouter from "./routes/schoolRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', schoolRouter)

const PORT = process.env.PORT || 4041

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})



