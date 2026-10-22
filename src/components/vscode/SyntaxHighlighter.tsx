import React, { useMemo } from 'react';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  theme?: 'dark-plus' | 'one-dark' | 'tokyo-night' | 'monokai' | 'matrix';
}

interface Token {
  text: string;
  type: 'keyword' | 'type' | 'function' | 'string' | 'comment' | 'number' | 'property' | 'plain';
}

const KEYWORDS = new Set([
  'import', 'from', 'export', 'default', 'class', 'interface', 'type', 'extends', 'implements',
  'public', 'private', 'protected', 'async', 'await', 'return', 'if', 'else', 'for', 'while',
  'const', 'let', 'var', 'new', 'throw', 'try', 'catch', 'finally', 'typeof', 'instanceof',
  'true', 'false', 'null', 'undefined', 'def', 'class', 'self', 'in', 'is', 'not', 'and', 'or',
  'fn', 'let', 'mut', 'pub', 'struct', 'impl', 'use', 'match', 'module', 'resource', 'variable',
  'terraform', 'provider', 'backend', 'required_providers', 'required_version', 'apiVersion', 'kind',
  'metadata', 'spec', 'version', 'services'
]);

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  // Check for whole line comment or trailing comment
  const trimmed = line.trimStart();
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return [{ text: line, type: 'comment' }];
  }

  while (i < line.length) {
    const char = line[i];

    // Comment until end of line
    if ((char === '/' && line[i + 1] === '/') || char === '#') {
      tokens.push({ text: line.slice(i), type: 'comment' });
      break;
    }

    // Strings
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      let str = quote;
      i++;
      while (i < line.length) {
        if (line[i] === '\\' && i + 1 < line.length) {
          str += line[i] + line[i + 1];
          i += 2;
        } else if (line[i] === quote) {
          str += quote;
          i++;
          break;
        } else {
          str += line[i];
          i++;
        }
      }
      tokens.push({ text: str, type: 'string' });
      continue;
    }

    // Numbers
    if (/[0-9]/.test(char) && (i === 0 || /[^a-zA-Z0-9_$]/.test(line[i - 1]))) {
      let num = '';
      while (i < line.length && /[0-9.xXa-fA-F_%]/.test(line[i])) {
        num += line[i];
        i++;
      }
      tokens.push({ text: num, type: 'number' });
      continue;
    }

    // Words / Identifiers
    if (/[a-zA-Z_$]/.test(char)) {
      let word = '';
      while (i < line.length && /[a-zA-Z0-9_$-]/.test(line[i])) {
        word += line[i];
        i++;
      }

      // Check following character for function call or property colon
      let nextNonSpace = '';
      for (let j = i; j < line.length; j++) {
        if (line[j] !== ' ') {
          nextNonSpace = line[j];
          break;
        }
      }

      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (nextNonSpace === '(') {
        tokens.push({ text: word, type: 'function' });
      } else if (nextNonSpace === ':' && line.indexOf('?') === -1) {
        tokens.push({ text: word, type: 'property' });
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
        tokens.push({ text: word, type: 'type' });
      } else {
        tokens.push({ text: word, type: 'plain' });
      }
      continue;
    }

    // Whitespace or symbols
    tokens.push({ text: char, type: 'plain' });
    i++;
  }

  return tokens;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code, theme = 'dark-plus' }) => {
  const lines = useMemo(() => code.split('\n'), [code]);

  // Color mapping based on theme
  const colors = useMemo(() => {
    switch (theme) {
      case 'tokyo-night':
        return {
          keyword: '#bb9af7',
          type: '#2ac3de',
          function: '#7aa2f7',
          string: '#9ece6a',
          comment: '#565f89',
          number: '#ff9e64',
          property: '#7dcfff',
          plain: '#c0caf5',
        };
      case 'one-dark':
        return {
          keyword: '#c678dd',
          type: '#e5c07b',
          function: '#61afef',
          string: '#98c379',
          comment: '#5c6370',
          number: '#d19a66',
          property: '#e06c75',
          plain: '#abb2bf',
        };
      case 'monokai':
        return {
          keyword: '#f92672',
          type: '#66d9ef',
          function: '#a6e22e',
          string: '#e6db74',
          comment: '#75715e',
          number: '#ae81ff',
          property: '#fd971f',
          plain: '#f8f8f2',
        };
      case 'matrix':
        return {
          keyword: '#00ff66',
          type: '#33ff33',
          function: '#66ff99',
          string: '#00cc44',
          comment: '#006622',
          number: '#55ff55',
          property: '#88ff88',
          plain: '#00ff41',
        };
      case 'dark-plus':
      default:
        return {
          keyword: '#c586c0',
          type: '#4ec9b0',
          function: '#dcdcaa',
          string: '#ce9178',
          comment: '#6a9955',
          number: '#b5cea8',
          property: '#9cdcfe',
          plain: '#d4d4d4',
        };
    }
  }, [theme]);

  return (
    <div className="font-mono text-[13px] leading-[21px] select-text">
      {lines.map((line, lineIdx) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={lineIdx} className="table-row">
            <span className="table-cell select-none pr-5 text-right font-mono text-[12px] opacity-35 hover:opacity-75 transition-opacity" style={{ width: '48px', color: '#858585' }}>
              {lineIdx + 1}
            </span>
            <span className="table-cell whitespace-pre font-mono">
              {tokens.map((token, tokenIdx) => (
                <span
                  key={tokenIdx}
                  style={{
                    color: colors[token.type],
                    fontStyle: token.type === 'comment' ? 'italic' : 'normal',
                    fontWeight: token.type === 'keyword' ? 500 : 400
                  }}
                >
                  {token.text}
                </span>
              ))}
              {line === '' && '\u00A0'}
            </span>
          </div>
        );
      })}
    </div>
  );
};
