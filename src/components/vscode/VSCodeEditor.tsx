import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  GitBranch, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Bell, 
  Radio, 
  Split, 
  MoreHorizontal,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import type { FakeCodeFile } from '../../data/fakeCodeData';
import type { ExamSet } from '../../types';
import { getAllExams } from '../../utils/storage';
import { DEFAULT_EXAMS } from '../../data/defaultExams';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { VSCodeExamRunner } from './VSCodeExamRunner';
import { VSCodeLectureViewer } from './VSCodeLectureViewer';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeEditorProps {
  files: FakeCodeFile[];
  activeFileId: string;
  openFileIds: string[];
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
  autoPilot: boolean;
  theme: 'dark-plus' | 'one-dark' | 'tokyo-night' | 'monokai' | 'matrix';
  onBossPanic: () => void;
}

export const VSCodeEditor: React.FC<VSCodeEditorProps> = ({
  files,
  activeFileId,
  openFileIds,
  onSelectFile,
  onCloseFile,
  autoPilot,
  theme,
  onBossPanic
}) => {
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const [allExamsList] = useState<ExamSet[]>(() => {
    const list = getAllExams();
    return list.length > 0 ? list : DEFAULT_EXAMS;
  });
  const [currentExam, setCurrentExam] = useState<ExamSet>(() => allExamsList[0] || DEFAULT_EXAMS[0]);

  // Character reveal progress for HackerTyper / Auto-Pilot mode per file
  const [typedProgress, setTypedProgress] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    files.forEach(f => {
      // Start with initial visible code (e.g. 70% or full)
      initial[f.id] = Math.min(f.content.length, 1200);
    });
    return initial;
  });

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const currentChars = typedProgress[activeFile.id] || 800;
  const visibleCode = activeFile.content.slice(0, currentChars);

  // Compute current line and col
  const lines = visibleCode.split('\n');
  const currentLine = lines.length;
  const currentCol = (lines[lines.length - 1] || '').length + 1;

  // Auto-Pilot continuous typing effect
  useEffect(() => {
    if (!autoPilot) return;

    const interval = setInterval(() => {
      setTypedProgress(prev => {
        const cur = prev[activeFile.id] || 0;
        const total = activeFile.content.length;
        if (cur >= total) {
          // Loop or pause
          return { ...prev, [activeFile.id]: 200 };
        }
        // Advance 3 to 8 characters
        const advance = Math.floor(Math.random() * 6) + 3;
        const next = Math.min(cur + advance, total);
        
        // Randomly play click sound
        if (Math.random() > 0.4) {
          keyboardAudio.playKeyClick();
        }

        return { ...prev, [activeFile.id]: next };
      });

      // Auto scroll to bottom of editor
      if (editorContainerRef.current) {
        editorContainerRef.current.scrollTop = editorContainerRef.current.scrollHeight;
      }
    }, 75);

    return () => clearInterval(interval);
  }, [autoPilot, activeFile]);

  // HackerTyper keyboard mash handler
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Avoid intercepting command shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') {
      onBossPanic();
      return;
    }

    keyboardAudio.playKeyClick(e.key === 'Enter' ? 'enter' : e.key === ' ' ? 'space' : 'char');

    // Advance 6-12 characters per keystroke
    setTypedProgress(prev => {
      const cur = prev[activeFile.id] || 0;
      const total = activeFile.content.length;
      const advance = Math.floor(Math.random() * 8) + 6;
      const next = cur >= total ? 300 : Math.min(cur + advance, total);
      return { ...prev, [activeFile.id]: next };
    });

    if (editorContainerRef.current) {
      editorContainerRef.current.scrollTop = editorContainerRef.current.scrollHeight;
    }
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'tokyo-night': return '#1a1b26';
      case 'one-dark': return '#282c34';
      case 'monokai': return '#272822';
      case 'matrix': return '#051205';
      case 'dark-plus':
      default: return '#1e1e1e';
    }
  };

  return (
    <div 
      className="flex-1 flex flex-col h-full overflow-hidden select-none outline-none"
      style={{ backgroundColor: getThemeBackground() }}
      tabIndex={0}
      onKeyDown={handleEditorKeyDown}
    >
      {/* 1. Editor Tabs Bar */}
      <div className="flex items-center justify-between h-[35px] bg-[#252526] border-b border-[#1e1e1e] overflow-x-auto text-[12px] scrollbar-none">
        <div className="flex items-center h-full">
          {openFileIds.map(fid => {
            const f = files.find(item => item.id === fid);
            if (!f) return null;
            const isActive = f.id === activeFileId;
            return (
              <div
                key={f.id}
                onClick={() => {
                  keyboardAudio.playKeyClick();
                  onSelectFile(f.id);
                }}
                className={`group flex items-center gap-2 h-full px-3 border-r border-[#1e1e1e] cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-[#1e1e1e] text-white border-t-2 border-[#007acc] font-medium' 
                    : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#282828] hover:text-[#cccccc]'
                }`}
                style={{ backgroundColor: isActive ? getThemeBackground() : undefined }}
              >
                <span className={`text-[10px] font-bold ${
                  f.fileType === 'exam' ? 'text-emerald-400' : f.fileType === 'lecture' ? 'text-sky-400' : 'text-[#3178c6]'
                }`}>
                  {f.fileType === 'exam' ? '🧪' : f.fileType === 'lecture' ? '📖' : f.name.split('.').pop()?.toUpperCase()}
                </span>
                <span className="truncate max-w-[150px]">{f.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseFile(f.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:bg-[#3c3c3c] text-[#888888] hover:text-white rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Tab controls */}
        <div className="flex items-center gap-2 px-3 text-[#888888]">
          <button className="hover:text-white cursor-pointer" title="Split Editor Right">
            <Split className="w-3.5 h-3.5" />
          </button>
          <MoreHorizontal className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* 2. Breadcrumbs Bar */}
      <div className="flex items-center gap-1.5 h-[22px] px-4 text-[11px] text-[#888888] border-b border-[#282828] bg-black/10 select-none">
        <span>aws-enterprise-core</span>
        <ChevronRight className="w-3 h-3" />
        {activeFile.path.split('/').map((seg, idx, arr) => (
          <React.Fragment key={idx}>
            <span className={idx === arr.length - 1 ? 'text-[#cccccc] font-medium' : ''}>{seg}</span>
            {idx < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
          </React.Fragment>
        ))}
      </div>

      {/* 3. Main Editor Body: Code View or Exam Runner or Lecture Viewer */}
      {activeFile.fileType === 'exam' ? (
        <VSCodeExamRunner
          exam={currentExam}
          allExams={allExamsList}
          onSelectExam={(id) => {
            const found = allExamsList.find(e => e.id === id);
            if (found) setCurrentExam(found);
          }}
        />
      ) : activeFile.fileType === 'lecture' ? (
        <VSCodeLectureViewer />
      ) : (
        /* Code Content Area with minimap */
        <div className="flex-1 flex overflow-hidden relative">
          <div 
            ref={editorContainerRef}
            className="flex-1 overflow-y-auto p-4 scrollbar-thin cursor-text"
          >
            <div className="relative">
              <SyntaxHighlighter code={visibleCode} language={activeFile.language} theme={theme} />
              
              {/* Blinking Cursor */}
              <span className="inline-block w-[2px] h-[17px] bg-[#007acc] animate-pulse align-middle ml-0.5" />
            </div>
          </div>

          {/* Minimap (VS Code authentic right mini preview) */}
          <div className="hidden lg:block w-[72px] h-full border-l border-white/[0.04] bg-black/20 p-1 select-none overflow-hidden shrink-0 opacity-70 hover:opacity-100 transition-opacity">
            <div className="space-y-[2px]">
              {lines.slice(0, 120).map((l, idx) => (
                <div 
                  key={idx} 
                  className="h-[1.5px] rounded-xs bg-[#569cd6]/40" 
                  style={{ 
                    width: `${Math.min(100, Math.max(15, l.length * 1.6))}%`,
                    backgroundColor: idx % 3 === 0 ? '#4ec9b055' : idx % 5 === 0 ? '#ce917855' : '#569cd644'
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Status Bar (Bottom) */}
      <div className="flex items-center justify-between h-[22px] bg-[#007acc] text-white px-3 text-[11px] font-sans select-none z-20">
        {/* Left Status Bar Items */}
        <div className="flex items-center gap-3">
          {/* Remote SSH Badge */}
          <div className="flex items-center gap-1 bg-[#16825d] px-2 h-full text-[10px] font-bold">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>SSH: aws-prod-01</span>
          </div>

          {/* Git Branch */}
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            <GitBranch className="w-3 h-3" />
            <span>main*</span>
            <RefreshCw className="w-2.5 h-2.5" />
          </div>

          {/* Errors and Warnings */}
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            <span className="flex items-center gap-0.5">
              <AlertCircle className="w-3 h-3" />
              0
            </span>
            <span>0</span>
          </div>
        </div>

        {/* Right Status Bar Items */}
        <div className="flex items-center gap-3 font-mono text-[10.5px]">
          <span className="hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            Ln {currentLine}, Col {currentCol}
          </span>
          <span className="hidden sm:inline hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            Spaces: 2
          </span>
          <span className="hidden sm:inline hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            UTF-8
          </span>
          <span className="hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer capitalize">
            {activeFile.language}
          </span>
          <span className="flex items-center gap-1 hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer">
            <Check className="w-3 h-3" />
            Prettier
          </span>

          {/* Discrete Boss Panic Escape Button */}
          <button
            onClick={onBossPanic}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
            title="Thoát giả lập - Trở về màn hình học thi AWS"
          >
            <ShieldAlert className="w-2.5 h-2.5" />
            <span>THOÁT (ESC)</span>
          </button>

          <Bell className="w-3 h-3 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
