import express from 'express';
import MovieController from '../controllers/movie.controller.js';
import {uploadHandler} from '../middlewares/upload.handler.js';

const router = express.Router();

router.get('/', MovieController.getMovies);
router.get('/:id', MovieController.getMovieById);
router.post('/', MovieController.createMovie);
router.put('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.destroyMovie);
router.post('/upload', uploadHandler, MovieController.uploadFile);

export default router;