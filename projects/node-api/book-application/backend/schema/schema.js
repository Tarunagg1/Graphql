const { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const _ = require('loadsh')
const { booksData, authorData } = require('../fakedata');
const bookModel = require('../models/book');
const authorModel = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        authorId: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authorModel.findById(parent.authorid)
                // return authorData.filter(ele => ele.id == parent.authorid)[0]
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent);
                return bookModel.find({ authorId: parent.id })
                // return booksData.filter(ele => ele.authorid == parent.id)
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return bookModel.findById(argd.id);
                // return booksData.filter(ele => ele.id == args.id)[0]
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                return authorModel.findById(argd.id);
                // return authorData.filter(ele => ele.id == args.id)[0]
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return bookModel.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authorModel.find({});
            }
        }
    }
})



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let author = new authorModel({ name: args.name, age: args.age })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                console.log('heyuhe');
                console.log(args);
                let newBook = new bookModel({ name: args.name, genre: args.genre, authorId: args.authorId })
                return newBook.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})






