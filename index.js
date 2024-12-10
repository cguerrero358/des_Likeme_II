
const express = require("express");
const cors =require ("cors")
require('dotenv').config();
const { getPosts, addPost, modificarPost, eliminarPost, likePost, dislikePost } = require("./consultas")

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

//levanta el servidor
app.listen(port, () =>{ console.log('Servidor corriendo en el puerto ' + port) });

//ruta que permite que el fronted reciba los registros a bd
app.get("/posts", async (req, res) => {
    try {
        const posts = await getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});



app.post("/posts", async(req,res)=>{
        try {
        const {titulo, img, descripcion, likes} = req.body;
        await addPost(titulo, img, descripcion, likes);
        res.status(200).json("Post agregado correctamente");
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})

app.put("/posts/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, img, descripcion, likes} = req.body;
        const postModificado = await modificarPost(id, titulo, img, descripcion, likes);
        res.status(200).json(postModificado);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await eliminarPost(id);
        res.status(200).json("Post eliminado correctamente");
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});

//ruta like

app.get ("/posts/like/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const like = await likePost(id);
        res.status(200).json(like);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});


app.put ("/posts/like/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const likeModificado = await dislikePost(id);
        res.status(200).json(likeModificado);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});

app.delete ("/posts/like/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const likeModificado = await dislikePost(id);
        res.status(200).json(likeModificado);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
});

