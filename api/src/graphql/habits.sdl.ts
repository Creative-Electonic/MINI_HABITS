export const schema = gql`
  type Habit {
    id: String!
    name: String!
    minimumCompletionRequirement: String!
    achieveCount: Int!
    user: User!
    userId: String!
  }

  type Query {
    habits: [Habit!]! @requireAuth
    habit(id: String!): Habit @requireAuth
  }

  input CreateHabitInput {
    name: String!
    minimumCompletionRequirement: String!
    achieveCount: Int!
    userId: String!
  }

  input UpdateHabitInput {
    name: String
    minimumCompletionRequirement: String
    achieveCount: Int
    userId: String
  }

  type Mutation {
    createHabit(input: CreateHabitInput!): Habit! @requireAuth
    updateHabit(id: String!, input: UpdateHabitInput!): Habit! @requireAuth
    deleteHabit(id: String!): Habit! @requireAuth
    achieveHabit(id: String): Habit! @requireAuth
  }
`
