const pool= require("./bd/conectionDb")

//POST  id, titulo, img, descripcion, likes

//obtiene desde la bd todos los registros
const getPosts = async () => {
    const consulta = 'SELECT * FROM posts';
    const result = await pool.query(consulta);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontraron posts' };
    }
}

//crear registros en la BD, agregar posts
const addPost = async (titulo, img, descripcion, likes) => {
    const consulta = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES($1,$2,$3,$4) RETURNING *';
    const result = await pool.query(consulta,[titulo, img, descripcion, likes]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se pudo agregar el post' };
    }
}

const modificarPost = async (id, titulo, img, descripcion, likes) => {
    const consulta = 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *';
    const result = await pool.query(consulta, [titulo, img, descripcion, likes, id]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontro el post con ese id' };
    }
    return result.rows
}

const eliminarPost = async (id) => {
    const consulta = 'DELETE FROM posts WHERE id = $1';
    const result = await pool.query(consulta, [id]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontro el post con ese id' };
    }
}

const getPostsPOrId = async (id) => {
    const consulta = 'SELECT * FROM posts WHERE id = $1';
    const result = await pool.query(consulta, [id]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontro el post con ese id' };
    }
    return result.rows
}

// LIKE

const likePost = async (id) => {
    const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const result = await pool.query(consulta, [id]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontro el post con ese id' };
    }
    return result.rows
}

const dislikePost = async (id) => {
    const consulta = 'UPDATE posts SET likes = likes - 1 WHERE id = $1 RETURNING *';
    const result = await pool.query(consulta, [id]);
    if (result.rowCount === 0) {
        throw { code: 404, message: 'No se encontro el post con ese id' };
    }
    return result.rows
}


module.exports = { getPosts, addPost, modificarPost, eliminarPost, getPostsPOrId, likePost, dislikePost }