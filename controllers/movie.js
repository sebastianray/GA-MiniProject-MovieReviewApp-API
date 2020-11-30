const { Movie, User, Review } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const { paginate } = require('../helpers/paginate');

class MovieController {
    static async getMoviePage(req, res) {
        const page = Number(req.params.page);
        const limit = 9;
        try {
            const movies = await Movie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            const result = paginate(page, limit, movies);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async getMovie(req, res) {
        try {
            const movies = await Movie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            res.status(200).json(movies);
        } catch (err) {
            res.status(500).json(err);
        }
    }


    static async movieDetails (req, res) {
        const id = req.params.id
        try {
            const found = await Movie.findOne({
                where : {
                    id
                }, 
                include : [
                    Review
                ]
            })
            if (found) {
                res.status(200).json(found)
            }else{
            res.status(404).json(
                { msg : "User not Found" }
            )}
        }catch (err){
            res.status(500).json(err);
        }
    }

    static async findByGenre(req, res) {
        const { genre } = req.params;
        try {
            const found = await Movie.findAll({
                where: {
                    genre
                }
            });
            res.status(200).json(found);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async addMovie(req, res) {
        const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = req.body;
        try {
            const found = await Movie.findOne({
                where: {
                    title
                }
            })
            // console.log(found)
            if (found) {
                res.status(409).json({
                    msg : "This Movie already exists"
                })
            } else {
                const movie = await Movie.create({
                    title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language
                })
                res.status(201).json(movie);
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    
    static async deleteMovie(req, res) {
        const id = req.params.id;
        try {
            const result = await Movie.destroy({
                where: { id }
            })
            if(result === 1) {
                res.status(200).json({
                    result,
                    msg: "Movie deleted"
                })
            } else {
                res.status(404).json({
                    result,
                    msg: "Movie not found"
                })
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    
    static async editMovie(req,res) {
        const id = req.params.id;
        const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = req.body;
        try{
            const cariId = await Movie.findOne({
                where: {
                    id
                }
            })
            if (cariId) {
                const update = await Movie.update({ title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language },
                    {
                        where: { id }
                    })
                res.status(200).json({
                    update,
                    msg: "This Movie Updated"
                })
            } else {
                res.status(404).json({
                    msg: "Movie not found"
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async searchMovie(req, res){
        const { title } = req.body;
        try {
            const found = await Movie.findOne({
                where: {
                    title: {
                        [Op.iLike]: '%' + title + '%'
                    }
                }
            });
            if (!found) {
                res.status(404).json(`'${title}' not found!`)
            } else {
                const movies = await Movie.findAll({
                    where: {
                        title: {
                            [Op.iLike]: '%' + title + '%'
                        }
                    }
                });
                res.status(200).json(movies);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }


}
module.exports = MovieController;
