import MovieService from '../services/movie.service.js'

export default class MovieController {
    static getMovies = async (req, res, next) => {
        try {
            const movies = await MovieService.findFilteredAll(req.query);
            res.status(200).json(movies)
        }
        catch(err) {
            next(err)
        }
    }
    static getMovieById = async (req, res, next) => {
        try {
            const movie = await MovieService.findById(req.params.id);
            res.status(200).json(movie)
        }
        catch(err) {
            next(err)
        }
    }

    static createMovie = async (req, res, next) => {
        try {
            const movie = await MovieService.createOne(req.body);
            res.status(200).json(movie)
        }
        catch(err) {
            next(err)
        }
    }

    static updateMovie = async (req, res, next) => {
        try {
            const movie = await MovieService.updateById(req.params.id, req.body);
            res.status(200).json(movie)
        }
        catch(err) {
            next(err)
        }
    }

    static destroyMovie = async (req, res, next) => {
        try {
            const movie = await MovieService.deleteById(req.params.id);
            res.status(200).json(movie)
        }
        catch(err) {
            next(err)
        }
    }

    static uploadFile = async (req, res, next) => {
        try {
            const upload = await MovieService.upload(req.file);
            res.status(200).json({
                "message": "Upload Success",
                "file url": upload
            })
        }
        catch(err){
            next(err)
        }
    }
};