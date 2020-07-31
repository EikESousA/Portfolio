import server from '@shared/infra/http/app';

server.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
