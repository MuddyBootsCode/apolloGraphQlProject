const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');


//Bring in GrapQl Express Middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//Create Schema for GraphQl
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


//Connect to MLAB mongodb database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Database Connected"))
    .catch(err => console.error(err));


//Initialize server
const app = express();

const corsOptions = {

    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

// Set up JWT authentication middleware

app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token !== "null"){
        try{

            const currentUser =  await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;

        } catch (err){

            console.error(err);

        }
    }

    next();

});

//Create GraphiQl application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//Connect schemas with GraphQl
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
        Recipe,
        User,
        currentUser
    }
})));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
   console.log(`Server listening on ${PORT}`);
});