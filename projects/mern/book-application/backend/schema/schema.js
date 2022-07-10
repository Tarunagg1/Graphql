const { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const _ = require('loadsh')
const booksData = require('../fakedata');

const BookType = new GraphQLInputObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(booksData, { id: args.id })
            }
        }
    },
})








module.exports = new GraphQLSchema({
    query: RootQuery,
})






