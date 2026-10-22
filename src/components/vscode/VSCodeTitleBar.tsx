import React from 'react';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  ShieldAlert, 
  Terminal as TerminalIcon,
  Palette
} from 'lucide-react';

interface VSCodeTitleBarProps {
  currentFile: string;
  onOpenCommandPalette: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  autoPilot: boolean;
  onToggleAutoPilot: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onBossPanic: () => void;
  onToggleTerminal: () => void;
  onCycleTheme: () => void;
  theme: string;
}

export const VSCodeTitleBar: React.FC<VSCodeTitleBarProps> = ({
  currentFile,
  onOpenCommandPalette,
  audioEnabled,
  onToggleAudio,
  autoPilot,
  onToggleAutoPilot,
  isFullscreen,
  onToggleFullscreen,
  onBossPanic,
  onToggleTerminal,
  onCycleTheme,
  theme
}) => {
  return (
    <div className="flex items-center justify-between h-[36px] bg-[#1f1f1f] border-b border-[#2d2d2d] px-3 select-none text-[12px] text-[#cccccc] z-30">
      {/* 1. Left: macOS Window Controls & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onBossPanic}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity flex items-center justify-center group"
            title="Boss Panic Key (Esc) - Return to Study"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black">✕</span>
          </button>
          <button 
            onClick={onToggleTerminal}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity"
            title="Toggle Terminal"
          />
          <button 
            onClick={onToggleFullscreen}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity"
            title="Toggle Fullscreen"
          />
        </div>

        {/* Menu Items (VS Code Native look) */}
        <div className="hidden sm:flex items-center gap-3 text-[12px] text-[#999999]">
          <span className="hover:text-white cursor-pointer">File</span>
          <span className="hover:text-white cursor-pointer">Edit</span>
          <span className="hover:text-white cursor-pointer">Selection</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Go</span>
          <span className="hover:text-white cursor-pointer">Run</span>
          <span className="hover:text-white cursor-pointer">Terminal</span>
          <span className="hover:text-white cursor-pointer">Help</span>
        </div>
      </div>

      {/* 2. Center: Command Palette Trigger Bar */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center justify-between w-full max-w-[420px] h-[24px] px-3 rounded-md bg-[#2d2d2d] hover:bg-[#383838] border border-[#3e3e3e] text-[#cccccc] transition-colors mx-2 cursor-pointer"
        title="Open Command Palette (Ctrl+P / Cmd+P)"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Search className="w-3 h-3 text-[#888888] shrink-0" />
          <span className="truncate text-[11px] text-[#aaaaaa]">
            aws-enterprise-core — {currentFile}
          </span>
        </div>
        <kbd className="hidden md:inline-block font-mono text-[10px] text-[#777777] bg-[#1e1e1e] px-1.5 py-0.5 rounded border border-[#3a3a3a]">
          Ctrl+P
        </kbd>
      </button>

      {/* 3. Right: Control Badges (Fake Working / Simulator controls) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Auto-Pilot Toggle */}
        <button
          onClick={onToggleAutoPilot}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
            autoPilot 
              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-950' 
              : 'bg-[#2d2d2d] text-[#aaaaaa] hover:text-white hover:bg-[#383838]'
          }`}
          title={autoPilot ? "Đang tự động code (Auto-Pilot ON) - Nhấn để tạm dừng" : "Bật chế độ Tự động code rảnh tay"}
        >
          {autoPilot ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-amber-400" />}
          <span className="hidden lg:inline">{autoPilot ? 'Tự động code: ON' : 'Tự động code'}</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`p-1.5 rounded transition-colors ${
            audioEnabled ? 'text-[#007acc] hover:bg-[#2d2d2d]' : 'text-[#666666] hover:text-[#999999] hover:bg-[#2d2d2d]'
          }`}
          title={audioEnabled ? "Tắt âm bàn phím cơ" : "Bật âm thanh gõ bàn phím cơ siêu mượt"}
        >
          {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Theme Cycle */}
        <button
          onClick={onCycleTheme}
          className="p-1.5 rounded text-[#999999] hover:text-white hover:bg-[#2d2d2d] transition-colors"
          title={`Theme hiện tại: ${theme}. Nhấn để đổi theme.`}
        >
          <Palette className="w-3.5 h-3.5" />
        </button>

        {/* Terminal Toggle */}
        <button
          onClick={onToggleTerminal}
          className="p-1.5 rounded text-[#999999] hover:text-white hover:bg-[#2d2d2d] transition-colors"
          title="Bật/Tắt Terminal"
        >
          <TerminalIcon className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded text-[#999999] hover:text-white hover:bg-[#2d2d2d] transition-colors"
          title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình F11 (Không lộ trình duyệt)"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        {/* Boss Panic Key Button */}
        <button
          onClick={onBossPanic}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900 transition-colors ml-1"
          title="Phím khẩn cấp Sếp/Giáo viên tới! (Esc) - Trở về ngay trang học"
        >
          <ShieldAlert className="w-3 h-3 text-rose-400" />
          <span className="font-semibold text-[10px]">BOSS (ESC)</span>
        </button>
      </div>
    </div>
  );
};
