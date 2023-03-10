import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import ansi from 'ansi-escape-sequences';
import 'xterm/css/xterm.css';
import './TerminalContainer.css';
import { FitAddon } from 'xterm-addon-fit';
import { GameInterface } from '../core';

function TerminalContainer(props: { gameInterface: GameInterface }) {
  const [terminal] = useState(new Terminal({
    scrollback: 0,
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: 14,
    theme: {
      background: '#1e1e1e'
    }
  }));
  const terminalRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;
    if (!terminalRef.current) return;
    
    firstRender.current = false;
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();
    terminal.write(ansi.cursor.hide);
    terminal.onKey((x) => props.gameInterface.onKey.next(x.key))
    props.gameInterface.onWrite.subscribe((x) => terminal.write(x));
  });

  useEffect(() => {
  }, []);

  return (
    <div className="terminal-container">
      <div
        className="terminal"
        ref={terminalRef}
      />
    </div>
  );
}

export default TerminalContainer;
