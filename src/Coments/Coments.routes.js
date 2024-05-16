import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../helpers/validarJwt.js";
import { createComment, editComment, deleteComment } from './Coments.controller.js';

const routerComments = Router();

// Ruta para crear un comentario en una publicación específica
routerComments.post(
    "/:idPost",
    [
        check("comment", "Comment is required").not().isEmpty(),
        validarJWT,
        validarCampos,
    ],
    createComment
);

// Ruta para editar un comentario específico en una publicación
routerComments.put(
    "/:idPost/:idComment",
    [
        check("comment", "Comment is required").not().isEmpty(),
        validarJWT,
        validarCampos,
    ],
    editComment
);

// Ruta para cambiar el estado de eliminación de un comentario específico en una publicación
routerComments.delete(
    "/:idPost/:idComment",
    validarJWT,
    deleteComment
);

export default routerComments;