import db from '../config/db.js';

export default class MovieRepository {
    static count = async (params) => {
        return await db.movies.count(params); 
    }

    static findMany = async (params) => {
        return await db.movies.findMany(params);
    }

    static findUnique = async (params) => {
        return await db.movies.findUnique(params);
    }

    static create = async (params) => {
        return await db.movies.create(params);
    }

    static update = async (params) => {
        return await db.movies.update(params);
    }

    static delete = async (params) => {
        return await db.movies.delete(params);
    }
}