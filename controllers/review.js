const { Review, User, Movie } = require('../models')
const { paginate } = require('../helpers/paginate');
const sequelize = require('sequelize')

class ReviewController {
    static async getReview(req, res) {
        try {
            const result = await Review.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static addFormReview(req, res) {
        // res.render('addReview.ejs');
    }

    static async reviewByUser(req, res) {
        const UserId = req.params.UserId;
        try {
            const user = await User.findOne({
                where: { id: UserId },
                attributes: ['name', 'image']
            });
            if(user) {
                const reviews = await Review.findAll({
                    where: { UserId },
                    order: [
                        ['id', 'ASC']
                    ],
                    include: [{
                        model: Movie,
                        attributes: ['title']
                    }],
                    attributes: ['id', 'rating', 'comment']
                });
                res.status(200).json({
                    "user": user,
                    reviews
                });
            } else {
                res.status(404).json({
                    msg: "User not found"
                })
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async reviewByMovie(req, res) {
        const MovieId = req.params.MovieId
        const page = req.params.page;
        const limit = 10;

        try {
            const movie = await Movie.findOne({
                where: { id: MovieId },
            });
            if(movie) {
                const reviews = await Review.findAll({
                    where: { MovieId },
                    order: [
                        ['id', 'ASC']
                    ],
                    attributes: ['rating', 'comment'],
                    include: {
                        model: User,
                        attributes: ['name', 'image']
                    }
                });
                let users = [];
                reviews.forEach(review => {
                    users.push(review.User)
                });
                const avgRate = await Review.findAll({ 
                    where: { MovieId },
                    attributes: [ 
                        [sequelize.fn('AVG', sequelize.col('rating')),'avgrating'] 
                    ],
                })

                const voteCount = await Review.findAll({ 
                    where: { MovieId },
                    attributes: [ 
                        [sequelize.fn('count', sequelize.col('rating')),'votecount'] 
                    ],
                })

                    const result = paginate(page, limit, reviews);
                res.status(200).json({
                    "Movie": movie.title,
                    "Rating": avgRate[0],
                    "votecount": voteCount[0],
                    "Comment": result
                });

            } else {
                res.status(404).json({
                    msg: "Movie not found"
                })
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    

    static async addReview(req, res) {
        const { rating, comment } = req.body;
        const MovieId = req.params.MovieId;
        const UserId = req.userData.id;

        try {
            const found = await Review.findOne({
                where: {
                    MovieId,
                    UserId
                }
            })
            if (found) {
                res.status(409).json("Can't review this movie again!")
            } else {
                const result = await Review.create({
                    UserId,
                    MovieId,
                    rating,
                    comment
                })
                res.status(201).json(result)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    
    static async deleteReview(req, res) {
        const id = req.params.id;
        try {
            const result = await Review.destroy({
                where: { id }
            });
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }


    static editFormReview(req, res) {
        const id = req.params.id;
        Review.findOne({
            where: { id }
        })
            .then(result => {
                console.log(result)
                // res.render('editReview.ejs', { review : result });
            })
            .catch(err => {
                res.send(err);
            })
    }

    static editReview(req, res) {
        const id = req.params.id;
        const { UserId, MovieId, rating, comment } = req.body;
        Review.update({
            UserId, MovieId, rating, comment
        }, {
            where: { id }
        })
            .then(result => {
                if (result[0] === 1) {
                    res.send('Update done!')
                } else {
                    res.send('Update not done!')
                }
            })
            .catch(err => {
                res.send(err)
            })
        }

        static async averageRating(req, res) {
            const MovieId = req.params.MovieId;
            try {
                const avgRate = await Review.findAll({ 
                    where: { MovieId },
                    attributes: [ 
                        [sequelize.fn('AVG', sequelize.col('rating')),'avgrating'] 
                    ],
                    // group: ['MovieId']
                })

                res.status(201).json(avgRate)
            } catch (err) {
                res.status(500).json(err)
            }
        }

    }

    


module.exports = ReviewController; 