import express, { Request, Response } from "express";
import cors from "cors";
import { pets } from "./database";
import { PET_SIZE, TPet } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Pong!')
})

//GET de /pets
app.get("/pets", (req: Request, res: Response) => {

  const nameToFind = req.query.name as string
  
  if (nameToFind){
    const result: TPet[] = pets.filter(
      (pet) => pet.name.toLowerCase().includes(nameToFind.toLowerCase())
    )
    res.status(200).send(result)
  }else{
    res.status(200).send(pets)
  }
})

// POST de /pets
app.post("/pets", (req: Request, res: Response) => {
  const id = req.body.id as string
	const name = req.body.name as string
	const age = req.body.age as number
	const size = req.body.size as PET_SIZE

  const newPet: TPet = {
    id: id,
    name: name,
    age: age,
    size: size
    
    // OU pode ser assim

    // id,
    // name,
    // age,
    // size
  }
  pets.push(newPet)
  res.status(201).send("Cadastro de pet realizado com sucesso!")
})