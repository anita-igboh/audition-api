export default `
enum PhaseStatus {
  UNLOCKED
  LOCKED
},

type Task {
  taskId: Int!
  taskName: String!
  isComplete: Boolean!
},

type Phase {
  phaseId: Int!
  phaseName: String!
  status: PhaseStatus!
  isDone: Boolean!
  tasks: [Task]!
}

input PhaseCreateInput {
  name: String!
}

input TaskCreateInput {
  name: String!
  phaseId: Int!
}

type Query {
  phases: [Phase]
  
  phase(id: Int!): Phase

  phaseTask(phaseId: Int!, taskId: Int!): Task
},

type Mutation {  
  phaseCreate(input: PhaseCreateInput!): Phase

  taskCreate(input: TaskCreateInput!): Phase

  taskStatusUpdate(phaseId: Int!, taskId: Int!): Task
},
`;
