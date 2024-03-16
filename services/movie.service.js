import MovieRepository from '../repositories/movie.repository.js';
import 'dotenv/config';

export default class MovieService {
    static findFilteredAll = async (query) => {
        try {
            let {title, genres, year, limit, page} = query;

            let resultFilter = {};
            let titleFilter = {};
            let genresFilter = {};
            let yearFilter = {};

            if (title) {
                titleFilter = {title: {contains: title}}
            };

            if (genres) {
                genresFilter = {genres: {contains: genres}}
            };

            if (year) {
                yearFilter = {year: year}
            };

            resultFilter.where = {
                ...titleFilter, 
                ...genresFilter, 
                ...yearFilter, 
            };

            // Find all filtered result first without paginated, for aggregated page and data count features.
            const count = await MovieRepository.count(resultFilter);

            if(limit) {
                resultFilter.take = parseInt(limit)
            }
            else {
                limit = 10;
                resultFilter.take = parseInt(limit)
            }

            if (page) {
                resultFilter.skip = (page - 1) * resultFilter.take
            }
            else {
                page = 1;
            }

            const result = await MovieRepository.findMany(resultFilter);

            let totalPages = Math.ceil(count / limit);
            let nextPage = Number(page) === totalPages ? null : Number(page) + 1;
            let prevPage = Number(page) === 1 ? null : Number(page) - 1;
            let currentPage = Number(page);
            // Learning Note: Javascript is a dynamic-type lang, so if u do  2 + 1, the result may returning "21", so use Typecript or blazingly fast Rust-lang 🦀 instead. 

            return {
                "Total Data": count,
                "Total Page": totalPages,
                "Current Page": currentPage,
                "Next Page": nextPage,
                "Previous Page": prevPage,
                "Find Result": result
            }
        }
        catch (err) {
            throw err
        }
    }

    static findById = async (id) => {
        try {
            const filter = {where: {id: parseInt(id)}};
            const result = await MovieRepository.findUnique(filter);
            if (!result) {
                throw {name: "Not Found", message: "Movie Not Found"}
            };
            return {"Find Result": result};
        } 
        catch (err) {
            throw err
        }
    }

    static createOne = async (body) => {
        try {            
            const record = {data: body};

            const movie = await MovieRepository.create(record);

            return movie;
        } 
        catch (err) {
            throw err
        }
    }

    static updateById = async (id, body) => {
        try {
            const filter = {where: {id: parseInt(id)}};

            const result = await MovieRepository.findUnique(filter);

            if (result) {
                const {title, genres, year} = body;

                const where = {id: parseInt(id)};

                const data =  
                    {
                        title: title, 
                        genres: genres, 
                        year: year
                    };

                const record = {data, where}
                const movie = await MovieRepository.update(record);
                return {
                    "Updated Data": movie
                }
            }
            else {
                throw {name: "Not Found", message: "Movie Not Found"}
            }
        } 
        catch (err) {
            throw err
        }
    }

    static deleteById = async (id) => {
        try {
            const filter = {where: {id: parseInt(id)}};
            const result = await MovieRepository.delete(filter);
            if (result) {
                const movie = await MovieRepository.delete(filter);
                return {"Deleted Data": movie}
            }
            else {
                throw {name: "Not Found", message: "Movie Not Found"}
            }
        } 
        catch (err) {
            throw err
        }
    }
    
    static upload = async (file) => {
        try {
            const url = `${process.env.BASE_URL}/api/images/${file.filename}`;
            return url;
        } 
        catch (err) {
            
        }
    }
}