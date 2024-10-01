import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { WebSocket, WebSocketServer } from 'ws';
import { spawn } from 'child_process';

const wss = new WebSocketServer({ noServer: true });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sessionId = uuidv4();
    const url = `ws://localhost:3000/api/ws/${sessionId}`;

    wss.on('connection', (ws: WebSocket, req: NextApiRequest) => {
      const viMongo = spawn('vi-mongo');

      viMongo.stdout.on('data', (data) => {
        ws.send(data.toString());
      });

      viMongo.stderr.on('data', (data) => {
        ws.send(data.toString());
      });

      ws.on('message', (message) => {
        viMongo.stdin.write(message.toString());
      });

      ws.on('close', () => {
        viMongo.kill();
      });
    });

    res.status(200).json({ url });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}