'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { io, Socket } from 'socket.io-client';
import 'xterm/css/xterm.css';

const Playground: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();
    terminalInstanceRef.current = terminal;

    // Connect to WebSocket server
    const socket = io('/terminal');
    socketRef.current = socket;

    socket.on('connect', () => {
      terminal.writeln('Connected to vi-mongo playground');
      terminal.writeln('Type "vi-mongo" to start the application');
    });

    socket.on('output', (data) => {
      terminal.write(data);
    });

    terminal.onData((data) => {
      socket.emit('input', data);
    });

    return () => {
      socket.disconnect();
      terminal.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (terminalInstanceRef.current) {
        const fitAddon = new FitAddon();
        terminalInstanceRef.current.loadAddon(fitAddon);
        fitAddon.fit();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={terminalRef} style={{ height: '500px', width: '100%' }} />;
};

export default Playground;