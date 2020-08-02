interface ICacheConfig {
  uri_prod: string;

  uri_test: string;

  option: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    useFindAndModify: boolean;
    useCreateIndex: boolean;
  };
}

export default {
  uri_prod:
    process.env.MONGODB_URI_PROD || 'mongodb://localhost:27017/portofolio',

  uri_test:
    process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/portofolio_test',

  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
