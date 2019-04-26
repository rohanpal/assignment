const graphql = require("graphql");
const uuid = require("uuid");
const objects = require("./Types/Types");
const Teacher = require("../models/teacher");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;
const lod = require("lodash");

const teacherType = new GraphQLObjectType({
  name: "teacher",
  fields: () => ({
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    _id: { type: GraphQLID },
    assignments: { type: new GraphQLList(assignmentType) }
  })
});
const studentType = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    _id: { type: GraphQLID }
  })
});
const questionType = new GraphQLObjectType({
  name: "questionType",
  fields: {
    question: { type: GraphQLString },
    answer: { type: GraphQLInt }
  }
});
const assignmentType = new GraphQLObjectType({
  name: "assignmentType",
  fields: {
    questions: { type: new GraphQLList(questionType) },
    creator: { type: teacherType }
  }
});
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    teachers: {
      type: new GraphQLList(teacherType),

      async resolve(parent, args) {
        try {
          const teacher = await Teacher.find();

          if (teacher) {
            return teacher;
          }
        } catch (e) {
          throw e;
        }
      }
    },
    student: {
      type: studentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return null;
      }
    },
    allTeachers: {
      type: new GraphQLList(teacherType),
      async resolve(parent, args) {
        try {
          const teacher = await Teacher.find();

          if (teacher) {
            return teacher;
          }
        } catch (e) {
          throw e;
        }
      }
    },
    allStudents: {
      type: new GraphQLList(studentType),
      resolve(parent, args) {
        return null;
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTeacher: {
      type: teacherType,
      args: {
        userName: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          const user = await Teacher.findOne({ userName: args.userName });
          if (user) {
            throw new Error("User already esxists");
          }
          const newTeacher = new Teacher({
            userName: args.userName,
            password: args.password
          });

          const savedTeacher = await newTeacher.save();
          return { ...savedTeacher._doc };
        } catch (e) {
          throw e;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
