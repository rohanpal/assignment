const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

module.exports = {
  objects: {
    teacherObject: {
      name: "teacher",
      fields: () => ({
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        id: { type: GraphQLID },
        createdAssignments: { type: GraphQLList }
      })
    },
    studentObject: {
      name: "student",
      fields: () => ({
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        id: { type: GraphQLID }
      })
    }
  }
};
