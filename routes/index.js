import express from 'express';
import movieRoutes from './movie.route.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json({"Hello": "World"})
    } 
    catch (err) {
        throw err
    }
});

router.use('/api/movies', movieRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
router.use("/api/images", express.static(path.join(__dirname, "../uploads")))

export default router;