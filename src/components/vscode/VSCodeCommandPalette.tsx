import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Play, 
  Volume2, 
  Maximize2, 
  ShieldAlert, 
  Palette, 
  FileCode,
  GitBranch,
  FlaskConical,
  BookOpen
} from 'lucide-react';
import type { FakeCodeFile } from '../../data/fakeCodeData';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  files: FakeCodeFile[];
  onSelectFile: (fileId: string) => void;
  onToggleAutoPilot: () => void;
  onToggleAudio: () => void;
  onToggleFullscreen: () => void;
  onToggleTerminal: () => void;
  onBossPanic: () => void;
  onCycleTheme: () => void;
  autoPilot: boolean;
  audioEnabled: boolean;
}

export const VSCodeCommandPalette: React.FC<VSCodeCommandPaletteProps> = ({
  isOpen,
  onClose,
  files,
  onSelectFile,
  onToggleAutoPilot,
  onToggleAudio,
  onToggleFullscreen,
  onToggleTerminal,
  onBossPanic,
  onCycleTheme,
  autoPilot,
  audioEnabled
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'autopilot',
      title: `Simulator: ${autoPilot ? 'Dừng Tự Động Code (Stop Auto-Pilot)' : 'Bật Tự Động Code Rảnh Tay (Start Auto-Pilot)'}`,
      category: 'Simulator',
      icon: Play,
      action: () => onToggleAutoPilot()
    },
    {
      id: 'sound',
      title: `Simulator: ${audioEnabled ? 'Tắt Âm Thanh Bàn Phím Cơ (Mute)' : 'Bật Âm Thanh Bàn Phím Cơ (Mechanical Keyboard Click)'}`,
      category: 'Audio',
      icon: Volume2,
      action: () => onToggleAudio()
    },
    {
      id: 'panic',
      title: '🚨 Boss Panic Key: Lập tức quay về trang học AWS',
      category: 'Emergency',
      icon: ShieldAlert,
      action: () => onBossPanic()
    },
    {
      id: 'theme',
      title: 'Preferences: Đổi giao diện VS Code (Dark+, One Dark, Tokyo Night, Monokai, Matrix)',
      category: 'Appearance',
      icon: Palette,
      action: () => onCycleTheme()
    },
    {
      id: 'fullscreen',
      title: 'View: Bật/Tắt Toàn Màn Hình F11 (Che thanh trình duyệt)',
      category: 'View',
      icon: Maximize2,
      action: () => onToggleFullscreen()
    },
    {
      id: 'terminal',
      title: 'View: Toggle Terminal (Bật/Tắt Terminal dòng lệnh)',
      category: 'View',
      icon: Terminal,
      action: () => onToggleTerminal()
    },
    {
      id: 'run-exam',
      title: '🧪 Test: Mở Bộ Đề Thi Thử CLF-C02 (Run Live Practice Exam)',
      category: 'Exam',
      icon: FlaskConical,
      action: () => onSelectFile('exam-runner')
    },
    {
      id: 'study-curriculum',
      title: '📖 Study: Mở Bài Giảng & Bí Kíp Cốt Lõi (AWS Curriculum)',
      category: 'Curriculum',
      icon: BookOpen,
      action: () => onSelectFile('lecture-guide')
    },
    ...files.map(f => ({
      id: `file-${f.id}`,
      title: f.path,
      category: 'File',
      icon: FileCode,
      action: () => onSelectFile(f.id)
    }))
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    keyboardAudio.playKeyClick();
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-8 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[560px] bg-[#1f1f1f] border border-[#3e3e3e] rounded-lg shadow-2xl overflow-hidden font-mono select-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#252526] border-b border-[#3e3e3e]">
          <Search className="w-4 h-4 text-[#888888] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or file name..."
            className="w-full bg-transparent border-none outline-none text-[#cccccc] font-mono text-[13px] placeholder:text-[#666666]"
          />
        </div>

        {/* Results list */}
        <div className="max-h-[320px] overflow-y-auto p-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[#888888] text-[12px]">
              No matching commands found
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#04395e] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#007acc]' : 'text-[#888888]'}`} />
                    <span className="text-[12px] truncate">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[#888888] shrink-0 font-sans ml-2">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
