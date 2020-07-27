interface ICacheConfig {
  uri: string;

  option: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    useFindAndModify: boolean;
    useCreateIndex: boolean;
  };
}

export default {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',

  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
