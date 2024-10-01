'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(terminalRef.current);
    fitAddon.fit();

    setTerminal(term);

    // Clean up
    return () => {
      term.dispose();
    };
  }, []);

  useEffect(() => {
    if (!terminal) return;

    // Request a new terminal session from the server
    fetch('/api/terminal-session', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setSocketUrl(data.url))
      .catch((error) => console.error('Failed to create terminal session:', error));
  }, [terminal]);

  useEffect(() => {
    if (!terminal || !socketUrl) return;

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      terminal.writeln('Connected to vi-mongo. Type "help" for available commands.');
    };

    socket.onmessage = (event) => {
      terminal.write(event.data);
    };

    socket.onclose = () => {
      terminal.writeln('Session terminated.');
    };

    terminal.onData((data) => {
      socket.send(data);
    });

    // Clean up
    return () => {
      socket.close();
    };
  }, [terminal, socketUrl]);

  return (
    <div className="h-[600px] w-full bg-gray-900 rounded-lg overflow-hidden">
      <div ref={terminalRef} className="h-full" />
    </div>
  );
};

export default TerminalComponent;