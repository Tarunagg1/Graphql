const postsResolvers = require('./posts');
const usersResolvers = require('./users');


module.exports = {
    Mutation: {
        ...usersResolvers.Mutation,
    },
}