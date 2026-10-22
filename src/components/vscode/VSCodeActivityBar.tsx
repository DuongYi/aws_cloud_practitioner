import React from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  LayoutGrid, 
  Box, 
  Settings, 
  UserCircle,
  FlaskConical
} from 'lucide-react';

export type ActivityTab = 'explorer' | 'search' | 'git' | 'test' | 'debug' | 'extensions';

interface VSCodeActivityBarProps {
  activeTab: ActivityTab;
  onSelectTab: (tab: ActivityTab) => void;
  isOpen: boolean;
}

export const VSCodeActivityBar: React.FC<VSCodeActivityBarProps> = ({
  activeTab,
  onSelectTab,
  isOpen
}) => {
  return (
    <div className="w-[48px] h-full bg-[#181818] border-r border-[#2b2b2b] flex flex-col justify-between py-2 shrink-0 select-none z-20">
      {/* Top primary tools */}
      <div className="flex flex-col items-center gap-1">
        {/* Explorer */}
        <button
          onClick={() => onSelectTab('explorer')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'explorer' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Explorer (Ctrl+Shift+E)"
        >
          {isOpen && activeTab === 'explorer' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <Files className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Search */}
        <button
          onClick={() => onSelectTab('search')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'search' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Search (Ctrl+Shift+F)"
        >
          {isOpen && activeTab === 'search' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <Search className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Source Control (with notification badge '3') */}
        <button
          onClick={() => onSelectTab('git')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'git' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Source Control: Git (Ctrl+Shift+G)"
        >
          {isOpen && activeTab === 'git' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <GitBranch className="w-6 h-6 stroke-[1.5]" />
          <span className="absolute top-2 right-2 px-1 py-0.2 rounded-full bg-[#007acc] text-white text-[9px] font-bold">
            3
          </span>
        </button>

        {/* Test / Exam Runner */}
        <button
          onClick={() => onSelectTab('test')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'test' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Testing: AWS Exam Suites & Practice Runner"
        >
          {isOpen && activeTab === 'test' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <FlaskConical className="w-6 h-6 stroke-[1.5]" />
          <span className="absolute top-2 right-2 px-1 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
            65
          </span>
        </button>

        {/* Run & Debug */}
        <button
          onClick={() => onSelectTab('debug')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'debug' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Run and Debug (Ctrl+Shift+D)"
        >
          {isOpen && activeTab === 'debug' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <Bug className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Extensions */}
        <button
          onClick={() => onSelectTab('extensions')}
          className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${
            isOpen && activeTab === 'extensions' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
          }`}
          title="Extensions (Ctrl+Shift+X)"
        >
          {isOpen && activeTab === 'extensions' && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          <LayoutGrid className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Docker / AWS Container Tool */}
        <button
          className="relative w-full h-[48px] flex items-center justify-center text-[#858585] hover:text-[#cccccc] transition-colors"
          title="Docker Containers"
        >
          <Box className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Bottom utility icons */}
      <div className="flex flex-col items-center gap-1">
        <button
          className="w-full h-[42px] flex items-center justify-center text-[#858585] hover:text-[#cccccc] transition-colors"
          title="Accounts: AWS Single Sign-On"
        >
          <UserCircle className="w-6 h-6 stroke-[1.5]" />
        </button>
        <button
          className="w-full h-[42px] flex items-center justify-center text-[#858585] hover:text-[#cccccc] transition-colors"
          title="Settings (Ctrl+,)"
        >
          <Settings className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
