const postModel = require("./models/post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getAllPost: async () => {
      const posts = await postModel.find();
      return posts;
    },
    getPost: async (parant, args, context, info) => {
      const { id } = args;
      return await postModel.findById(id);
    },
  },
  Mutation: {
    createPost: async (parant, args, context, info) => {
      const { title, description } = args;
      const newPost = new postModel({
        title: args.post.title,
        description: args.post.description,
      });
      const resp = await newPost.save();
      return resp;
    },
    deletePost: async (parant, args, context, info) => {
      const { id } = args;
      return await postModel.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
