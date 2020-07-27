/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import socketio, { Server as ServerSocketIO } from 'socket.io';
import { Server as ServerHTTP } from 'http';

import calculateDistance from '@modules/devradar/devs/utils/calculateDistance';
import parseStringAsArray from '@modules/devradar/devs/utils/parseStringAsArray';

interface IConnection {
  id: string;
  type: 'aircnc' | 'tindev' | 'devradar';
  aircnc?: {
    user_id: string;
  };
  tindev?: {
    user_id: string;
  };
  devradar?: {
    coordinates?: ICoordinates;
    techs?: string[];
  };
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

let io: ServerSocketIO;
const connections: IConnection[] = [];

export function setupWebSocket(server: ServerHTTP): void {
  io = socketio(server);

  io.on('connection', function connect(socket: any) {
    const { type } = socket.handshake.query;

    if (type === 'aircnc') {
      const { user_id } = socket.handshake.query;
      connections.push({
        id: socket.id,
        type,
        aircnc: {
          user_id,
        },
      });
    } else if (type === 'tindev') {
      const { user_id } = socket.handshake.query;
      connections.push({
        id: socket.id,
        type,
        aircnc: {
          user_id,
        },
      });
    } else if (type === 'devradar') {
      const { latitude, longitude, techs } = socket.handshake.query;
      connections.push({
        id: socket.id,
        type,
        devradar: {
          coordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
          techs: parseStringAsArray(techs),
        },
      });
    }
  });
}

export function findConnections(
  coordinates: ICoordinates,
  techs: string[],
): any[] {
  return connections.filter(function search(connection: any) {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(function include(item: any) {
        return techs.includes(item);
      })
    );
  });
}

export function sendMessage(to: any, message: any, data: any): void {
  to.forEach(function send(connection: any) {
    io.to(connection.id).emit(message, data);
  });
}
