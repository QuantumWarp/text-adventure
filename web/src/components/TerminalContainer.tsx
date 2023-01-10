import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import ansi from 'ansi-escape-sequences';
import 'xterm/css/xterm.css';
import './TerminalContainer.css';
import { FitAddon } from 'xterm-addon-fit';

function TerminalContainer() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;
    if (!terminalRef.current) return;
    
    firstRender.current = false;
    const terminal = new Terminal({ scrollback: 0 });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();
    terminal.write(ansi.cursor.hide);
  });

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
