interface IConnections {
  [propName: string]: string;
}

declare namespace Express {
  export interface Request {
    io?: import('socket.io').Server;
    connections?: IConnections;
  }
}
