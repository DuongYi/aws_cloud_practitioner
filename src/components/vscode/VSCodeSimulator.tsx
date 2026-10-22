import React, { useState, useEffect, useCallback } from 'react';
import { VSCodeTitleBar } from './VSCodeTitleBar';
import { VSCodeActivityBar, ActivityTab } from './VSCodeActivityBar';
import { VSCodeSideBar } from './VSCodeSideBar';
import { VSCodeEditor } from './VSCodeEditor';
import { VSCodeTerminal } from './VSCodeTerminal';
import { VSCodeCommandPalette } from './VSCodeCommandPalette';
import { FAKE_PROJECT_FILES } from '../../data/fakeCodeData';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeSimulatorProps {
  onExit: () => void;
}

type ThemeName = 'dark-plus' | 'one-dark' | 'tokyo-night' | 'monokai' | 'matrix';

export const VSCodeSimulator: React.FC<VSCodeSimulatorProps> = ({ onExit }) => {
  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>('explorer');
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  
  // Open files and active file
  const [openFileIds, setOpenFileIds] = useState<string[]>([
    'cloud-orchestrator',
    'terraform-main',
    'kubernetes-prod'
  ]);
  const [activeFileId, setActiveFileId] = useState<string>('cloud-orchestrator');

  // Simulator controls
  const [autoPilot, setAutoPilot] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeName>('dark-plus');

  // Boss key panic escape handler
  const handleBossPanic = useCallback(() => {
    // If browser is fullscreen, exit it
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onExit();
  }, [onExit]);

  // Global keyboard shortcuts within simulator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape -> Boss Panic Key
      if (e.key === 'Escape') {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false);
        } else {
          handleBossPanic();
        }
        return;
      }

      // Ctrl+P or Cmd+P or Ctrl+Shift+P -> Command Palette
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
        return;
      }

      // Ctrl+` or Ctrl+~ -> Toggle Terminal
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
        return;
      }

      // Ctrl+B -> Toggle SideBar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSideBarOpen(prev => !prev);
        return;
      }

      // F11 -> Fullscreen toggle
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, handleBossPanic]);

  // Fullscreen toggle via Browser API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleSelectActivityTab = (tab: ActivityTab) => {
    keyboardAudio.playKeyClick();
    if (activeActivityTab === tab && isSideBarOpen) {
      setIsSideBarOpen(false);
    } else {
      setActiveActivityTab(tab);
      setIsSideBarOpen(true);
    }
  };

  const handleSelectFile = (fileId: string) => {
    if (!openFileIds.includes(fileId)) {
      setOpenFileIds(prev => [...prev, fileId]);
    }
    setActiveFileId(fileId);
  };

  const handleCloseFile = (fileId: string) => {
    keyboardAudio.playKeyClick();
    const nextOpen = openFileIds.filter(id => id !== fileId);
    setOpenFileIds(nextOpen);
    if (activeFileId === fileId) {
      setActiveFileId(nextOpen[nextOpen.length - 1] || FAKE_PROJECT_FILES[0].id);
    }
  };

  const cycleTheme = () => {
    keyboardAudio.playKeyClick();
    const themes: ThemeName[] = ['dark-plus', 'tokyo-night', 'one-dark', 'monokai', 'matrix'];
    const curIdx = themes.indexOf(theme);
    setTheme(themes[(curIdx + 1) % themes.length]);
  };

  const activeFile = FAKE_PROJECT_FILES.find(f => f.id === activeFileId) || FAKE_PROJECT_FILES[0];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden select-none">
      {/* 1. VS Code Title Bar */}
      <VSCodeTitleBar
        currentFile={activeFile.name}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        audioEnabled={audioEnabled}
        onToggleAudio={() => {
          const newState = keyboardAudio.toggle();
          setAudioEnabled(newState);
        }}
        autoPilot={autoPilot}
        onToggleAutoPilot={() => {
          keyboardAudio.playKeyClick();
          setAutoPilot(!autoPilot);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onBossPanic={handleBossPanic}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        onCycleTheme={cycleTheme}
        theme={theme}
      />

      {/* 2. Main Workbench (Activity Bar + Side Bar + Editor/Terminal) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <VSCodeActivityBar
          activeTab={activeActivityTab}
          onSelectTab={handleSelectActivityTab}
          isOpen={isSideBarOpen}
        />

        {/* Side Bar */}
        {isSideBarOpen && (
          <VSCodeSideBar
            activeTab={activeActivityTab}
            files={FAKE_PROJECT_FILES}
            activeFileId={activeFileId}
            openFileIds={openFileIds}
            onSelectFile={handleSelectFile}
            onCloseFile={handleCloseFile}
          />
        )}

        {/* Editor Area & Terminal Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <VSCodeEditor
            files={FAKE_PROJECT_FILES}
            activeFileId={activeFileId}
            openFileIds={openFileIds.length > 0 ? openFileIds : [FAKE_PROJECT_FILES[0].id]}
            onSelectFile={handleSelectFile}
            onCloseFile={handleCloseFile}
            autoPilot={autoPilot}
            theme={theme}
            onBossPanic={handleBossPanic}
          />

          {/* Collapsible Bottom Terminal */}
          {isTerminalOpen && (
            <VSCodeTerminal
              onClose={() => setIsTerminalOpen(false)}
              isMaximized={isTerminalMaximized}
              onToggleMaximize={() => setIsTerminalMaximized(!isTerminalMaximized)}
            />
          )}
        </div>
      </div>

      {/* 3. Floating Command Palette Modal */}
      <VSCodeCommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        files={FAKE_PROJECT_FILES}
        onSelectFile={handleSelectFile}
        onToggleAutoPilot={() => setAutoPilot(!autoPilot)}
        onToggleAudio={() => setAudioEnabled(keyboardAudio.toggle())}
        onToggleFullscreen={toggleFullscreen}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        onBossPanic={handleBossPanic}
        onCycleTheme={cycleTheme}
        autoPilot={autoPilot}
        audioEnabled={audioEnabled}
      />
    </div>
  );
};
