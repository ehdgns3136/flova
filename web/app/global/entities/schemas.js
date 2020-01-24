import { schema } from 'normalizr';

const questionSchema = new schema.Entity('questions');
const answerSchema = new schema.Entity('answers');
const userSchema = new schema.Entity('users');
const topicSchema = new schema.Entity('topics');
const questionCommentSchema = new schema.Entity('questionComments');
const answerCommentSchema = new schema.Entity('answerComments');

questionSchema.define({
  writer: userSchema,
  topics: [topicSchema],
  comments: [questionCommentSchema],
  my_answer: answerSchema,
});

answerSchema.define({
  writer: userSchema,
  comments: [answerCommentSchema],
});

questionCommentSchema.define({
  writer: userSchema,
});

answerCommentSchema.define({
  writer: userSchema,
});

const activitiesSchema = [{
  activity_data: {
    following_topics: [topicSchema],
    following_users: [userSchema],
  },
  content: {
    question: questionSchema,
    answer: answerSchema,
  },
}];

export {
  questionSchema,
  answerSchema,
  userSchema,
  topicSchema,
  questionCommentSchema,
  answerCommentSchema,
  activitiesSchema,
};
