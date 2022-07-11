const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
require('./config/db');


const app = express();


const PORT = 4000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    // rootValue: root,
}))

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})

