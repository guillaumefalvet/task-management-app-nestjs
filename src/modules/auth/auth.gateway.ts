import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from './ws-auth.guard';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class AuthGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer() server: Server;
  private readonly logger: Logger = new Logger(AuthGateway.name);

  afterInit(): void {
    this.logger.log('Auth gateway initialized');
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('hello')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ): Promise<void> {
    this.logger.log(`Received message from client ${client.id}: ${message}`);
    try {
      this.server.emit('Welcome', message);
    } catch (error) {
      throw new WsException(error?.message);
    }
  }
  @SubscribeMessage('ping')
  async handlePing(@ConnectedSocket() client: Socket): Promise<void> {
    this.logger.log(`Received ping from client ${client.id}`);
    try {
      this.server.emit('pong');
    } catch (error) {
      throw new WsException(error?.message);
    }
  }
}
