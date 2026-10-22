import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  MoreHorizontal, 
  RefreshCw,
  Search,
  Check,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import type { ActivityTab } from './VSCodeActivityBar';
import type { FakeCodeFile } from '../../data/fakeCodeData';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeSideBarProps {
  activeTab: ActivityTab;
  files: FakeCodeFile[];
  activeFileId: string;
  openFileIds: string[];
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
}

export const VSCodeSideBar: React.FC<VSCodeSideBarProps> = ({
  activeTab,
  files,
  activeFileId,
  openFileIds,
  onSelectFile,
  onCloseFile
}) => {
  const [openEditorsExpanded, setOpenEditorsExpanded] = useState(true);
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState<Record<string, boolean>>({
    src: true,
    services: true,
    infra: true,
    terraform: true,
    deploy: true,
    k8s: true,
    ml: true,
    security: true,
    tests: true,
    exams: true,
    docs: true,
    curriculum: true
  });

  const toggleFolder = (folder: string) => {
    keyboardAudio.playKeyClick();
    setFoldersOpen(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const getFileBadgeColor = (status?: string) => {
    if (status === 'M') return 'text-[#e2c08d]';
    if (status === 'U') return 'text-[#73c991]';
    if (status === 'A') return 'text-[#73c991]';
    return '';
  };

  const renderFileIcon = (icon: FakeCodeFile['icon']) => {
    switch (icon) {
      case 'ts':
        return <span className="font-bold text-[10px] text-[#3178c6] w-4 text-center">TS</span>;
      case 'tf':
        return <span className="font-bold text-[10px] text-[#844fba] w-4 text-center">TF</span>;
      case 'yaml':
        return <span className="font-bold text-[10px] text-[#cb171e] w-4 text-center">Y</span>;
      case 'py':
        return <span className="font-bold text-[10px] text-[#3572a5] w-4 text-center">PY</span>;
      case 'rs':
        return <span className="font-bold text-[10px] text-[#dea584] w-4 text-center">RS</span>;
      case 'docker':
        return <span className="font-bold text-[10px] text-[#2496ed] w-4 text-center">🐳</span>;
      case 'test':
        return <span className="font-bold text-[10px] text-emerald-400 w-4 text-center">🧪</span>;
      case 'md':
        return <span className="font-bold text-[10px] text-sky-400 w-4 text-center">📖</span>;
      default:
        return <FileText className="w-3.5 h-3.5 text-[#cccccc]" />;
    }
  };

  return (
    <div className="w-[240px] h-full bg-[#252526] border-r border-[#1e1e1e] flex flex-col shrink-0 select-none text-[12px] text-[#cccccc] overflow-hidden">
      {/* 1. Header of Side Bar */}
      <div className="flex items-center justify-between px-4 h-[35px] border-b border-[#2d2d2d] uppercase text-[11px] font-semibold tracking-wider text-[#bbbbbb]">
        <span>{activeTab === 'explorer' ? 'Explorer' : activeTab === 'git' ? 'Source Control' : activeTab === 'search' ? 'Search' : activeTab === 'test' ? 'Testing' : activeTab === 'debug' ? 'Run and Debug' : 'Extensions'}</span>
        <div className="flex items-center gap-1 text-[#888888]">
          <MoreHorizontal className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* 2. Side Bar Body depending on activeTab */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* EXPLORER TAB */}
        {activeTab === 'explorer' && (
          <div className="py-1">
            {/* Open Editors Section */}
            <div>
              <div 
                onClick={() => setOpenEditorsExpanded(!openEditorsExpanded)}
                className="flex items-center gap-1 px-2 py-1 font-bold text-[11px] text-[#aaaaaa] hover:text-white cursor-pointer"
              >
                {openEditorsExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>OPEN EDITORS</span>
              </div>

              {openEditorsExpanded && (
                <div className="pl-2">
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
                        className={`group flex items-center justify-between px-3 py-1 cursor-pointer transition-colors ${
                          isActive ? 'bg-[#37373d] text-white font-medium' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {renderFileIcon(f.icon)}
                          <span className="truncate">{f.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {f.gitStatus && (
                            <span className={`text-[10px] font-bold ${getFileBadgeColor(f.gitStatus)}`}>
                              {f.gitStatus}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onCloseFile(f.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 hover:text-white text-[#888888] p-0.5 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Workspace Tree Section */}
            <div className="mt-2">
              <div 
                onClick={() => setWorkspaceExpanded(!workspaceExpanded)}
                className="flex items-center gap-1 px-2 py-1 font-bold text-[11px] text-[#aaaaaa] hover:text-white cursor-pointer"
              >
                {workspaceExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span className="truncate">AWS-ENTERPRISE-CORE</span>
              </div>

              {workspaceExpanded && (
                <div className="pl-3 py-1 font-mono text-[12px]">
                  {/* Folder: tests (Exams) */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('tests')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.tests ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.tests ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span className="text-emerald-400 font-medium">tests (exams)</span>
                    </div>

                    {foldersOpen.tests && (
                      <div className="pl-4">
                        <div
                          onClick={() => {
                            keyboardAudio.playKeyClick();
                            onSelectFile('exam-runner');
                          }}
                          className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                            activeFileId === 'exam-runner' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {renderFileIcon('test')}
                            <span className="truncate text-emerald-300">clf-c02-practice-exam-1.spec.ts</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-1 rounded">65Q</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Folder: docs (Curriculum) */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('docs')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.docs ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.docs ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span className="text-sky-400 font-medium">docs (curriculum)</span>
                    </div>

                    {foldersOpen.docs && (
                      <div className="pl-4">
                        <div
                          onClick={() => {
                            keyboardAudio.playKeyClick();
                            onSelectFile('lecture-guide');
                          }}
                          className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                            activeFileId === 'lecture-guide' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {renderFileIcon('md')}
                            <span className="truncate text-sky-300">AWS_CLF_C02_CURRICULUM.md</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Folder: src */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('src')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.src ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.src ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span>src</span>
                    </div>

                    {foldersOpen.src && (
                      <div className="pl-4">
                        {/* Subfolder: services */}
                        <div>
                          <div 
                            onClick={() => toggleFolder('services')}
                            className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                          >
                            {foldersOpen.services ? <ChevronDown className="w-3 h-3 text-[#888888]" /> : <ChevronRight className="w-3 h-3 text-[#888888]" />}
                            {foldersOpen.services ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                            <span>services</span>
                          </div>
                          {foldersOpen.services && (
                            <div className="pl-4">
                              <div
                                onClick={() => {
                                  keyboardAudio.playKeyClick();
                                  onSelectFile('cloud-orchestrator');
                                }}
                                className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                                  activeFileId === 'cloud-orchestrator' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  {renderFileIcon('ts')}
                                  <span className="truncate">cloud-orchestrator.ts</span>
                                </div>
                                <span className="text-[10px] font-bold text-[#e2c08d]">M</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Subfolder: security */}
                        <div>
                          <div 
                            onClick={() => toggleFolder('security')}
                            className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                          >
                            {foldersOpen.security ? <ChevronDown className="w-3 h-3 text-[#888888]" /> : <ChevronRight className="w-3 h-3 text-[#888888]" />}
                            {foldersOpen.security ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                            <span>security</span>
                          </div>
                          {foldersOpen.security && (
                            <div className="pl-4">
                              <div
                                onClick={() => {
                                  keyboardAudio.playKeyClick();
                                  onSelectFile('crypto-verifier');
                                }}
                                className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                                  activeFileId === 'crypto-verifier' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  {renderFileIcon('rs')}
                                  <span className="truncate">token_verifier.rs</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Folder: infra */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('infra')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.infra ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.infra ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span>infra</span>
                    </div>
                    {foldersOpen.infra && (
                      <div className="pl-4">
                        <div 
                          onClick={() => toggleFolder('terraform')}
                          className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                        >
                          {foldersOpen.terraform ? <ChevronDown className="w-3 h-3 text-[#888888]" /> : <ChevronRight className="w-3 h-3 text-[#888888]" />}
                          {foldersOpen.terraform ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                          <span>terraform</span>
                        </div>
                        {foldersOpen.terraform && (
                          <div className="pl-4">
                            <div
                              onClick={() => {
                                keyboardAudio.playKeyClick();
                                onSelectFile('terraform-main');
                              }}
                              className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                                activeFileId === 'terraform-main' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                {renderFileIcon('tf')}
                                <span className="truncate">main.tf</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#e2c08d]">M</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Folder: deploy */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('deploy')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.deploy ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.deploy ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span>deploy</span>
                    </div>
                    {foldersOpen.deploy && (
                      <div className="pl-4">
                        <div 
                          onClick={() => toggleFolder('k8s')}
                          className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                        >
                          {foldersOpen.k8s ? <ChevronDown className="w-3 h-3 text-[#888888]" /> : <ChevronRight className="w-3 h-3 text-[#888888]" />}
                          {foldersOpen.k8s ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                          <span>k8s</span>
                        </div>
                        {foldersOpen.k8s && (
                          <div className="pl-4">
                            <div
                              onClick={() => {
                                keyboardAudio.playKeyClick();
                                onSelectFile('kubernetes-prod');
                              }}
                              className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                                activeFileId === 'kubernetes-prod' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                {renderFileIcon('yaml')}
                                <span className="truncate">cluster-prod.yaml</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#73c991]">U</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Folder: ml */}
                  <div>
                    <div 
                      onClick={() => toggleFolder('ml')}
                      className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc]"
                    >
                      {foldersOpen.ml ? <ChevronDown className="w-3.5 h-3.5 text-[#888888]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />}
                      {foldersOpen.ml ? <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a]" /> : <Folder className="w-3.5 h-3.5 text-[#dcb67a]" />}
                      <span>ml</span>
                    </div>
                    {foldersOpen.ml && (
                      <div className="pl-4">
                        <div
                          onClick={() => {
                            keyboardAudio.playKeyClick();
                            onSelectFile('ai-inference');
                          }}
                          className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                            activeFileId === 'ai-inference' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {renderFileIcon('py')}
                            <span className="truncate">inference_pipeline.py</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#e2c08d]">M</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Root file: docker-compose */}
                  <div
                    onClick={() => {
                      keyboardAudio.playKeyClick();
                      onSelectFile('docker-compose-prod');
                    }}
                    className={`flex items-center justify-between py-0.5 px-1.5 cursor-pointer rounded-sm ${
                      activeFileId === 'docker-compose-prod' ? 'bg-[#37373d] text-white font-medium' : 'hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      {renderFileIcon('docker')}
                      <span className="truncate">docker-compose.prod.yml</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOURCE CONTROL TAB */}
        {activeTab === 'git' && (
          <div className="p-3 space-y-3">
            <div className="space-y-2">
              <input 
                type="text" 
                defaultValue="feat(infra): optimize multi-region ECS task reconciliation"
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-2.5 py-1 text-[11px] text-[#cccccc] focus:outline-none focus:border-[#007acc]"
              />
              <button className="w-full bg-[#007acc] hover:bg-[#0062a3] text-white py-1 rounded text-[11px] font-medium flex items-center justify-center gap-1.5">
                <Check className="w-3 h-3" />
                <span>Commit & Push (main)</span>
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-[#888888] pb-1">
                <span>CHANGES (3)</span>
                <span className="text-[10px] text-[#007acc] cursor-pointer hover:underline">Discard All</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex items-center justify-between py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer">
                  <span className="text-[#cccccc] truncate">cloud-orchestrator.ts</span>
                  <span className="text-[#e2c08d] font-bold text-[10px]">M</span>
                </div>
                <div className="flex items-center justify-between py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer">
                  <span className="text-[#cccccc] truncate">main.tf</span>
                  <span className="text-[#e2c08d] font-bold text-[10px]">M</span>
                </div>
                <div className="flex items-center justify-between py-0.5 px-1 hover:bg-[#2a2d2e] cursor-pointer">
                  <span className="text-[#cccccc] truncate">cluster-prod.yaml</span>
                  <span className="text-[#73c991] font-bold text-[10px]">U</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="p-3 space-y-3">
            <input 
              type="text" 
              placeholder="Search (e.g. CloudOrchestrator)"
              defaultValue="CloudOrchestrator"
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-2.5 py-1 text-[11px] text-[#cccccc] focus:outline-none focus:border-[#007acc]"
            />
            <div className="text-[11px] text-[#888888]">
              4 results in 2 files
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-[#e2c08d]">cloud-orchestrator.ts (3)</div>
              <div className="pl-3 text-[10px] text-[#888888] truncate hover:text-white cursor-pointer">
                L24: export class CloudInfrastructureManager
              </div>
              <div className="pl-3 text-[10px] text-[#888888] truncate hover:text-white cursor-pointer">
                L42: this.logger = new Logger("CloudOrchestrator")
              </div>
            </div>
          </div>
        )}

        {/* TEST RUNNER TAB */}
        {activeTab === 'test' && (
          <div className="p-3 space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[11px] text-emerald-400">AWS EXAM TEST SUITES</span>
              <span className="text-[10px] text-[#888888]">4 Suites</span>
            </div>

            <button
              onClick={() => {
                keyboardAudio.playKeyClick();
                onSelectFile('exam-runner');
              }}
              className="w-full bg-[#388a34] hover:bg-[#2d7329] text-white py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Thi Thử Ngay (Run Practice Exam)</span>
            </button>

            <div className="space-y-1 font-mono text-[11px] pt-1">
              <div 
                onClick={() => {
                  keyboardAudio.playKeyClick();
                  onSelectFile('exam-runner');
                }}
                className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2a2d2e] cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-emerald-400">✓</span>
                  <span className="truncate text-white font-medium">Practice Exam 1 (Mô phỏng)</span>
                </div>
                <span className="text-[10px] text-emerald-400">65Q</span>
              </div>

              <div 
                onClick={() => {
                  keyboardAudio.playKeyClick();
                  onSelectFile('exam-runner');
                }}
                className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2a2d2e] cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-emerald-400">✓</span>
                  <span className="truncate text-[#cccccc]">Practice Exam 2 (Cơ bản)</span>
                </div>
                <span className="text-[10px] text-[#888888]">65Q</span>
              </div>

              <div 
                onClick={() => {
                  keyboardAudio.playKeyClick();
                  onSelectFile('lecture-guide');
                }}
                className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2a2d2e] cursor-pointer text-sky-300 border-t border-white/[0.04] mt-2 pt-2"
              >
                <div className="flex items-center gap-2 truncate">
                  <span>📖</span>
                  <span className="truncate font-sans font-medium">14 Chuyên Đề Bài Giảng</span>
                </div>
                <span className="text-[10px] text-[#888888]">200L</span>
              </div>
            </div>
          </div>
        )}

        {/* DEBUG TAB */}
        {activeTab === 'debug' && (
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-2 bg-[#1e1e1e] p-2 rounded border border-[#3c3c3c]">
              <button className="w-6 h-6 rounded bg-[#388a34] flex items-center justify-center text-white">
                <Play className="w-3 h-3 fill-current" />
              </button>
              <span className="text-[11px] text-white truncate font-medium">Launch AWS Node.js Daemon</span>
            </div>
            <div className="text-[11px] text-[#888888] space-y-2">
              <div className="font-bold">VARIABLES</div>
              <div className="pl-2 font-mono text-[10px] text-[#cccccc] space-y-0.5">
                <div>AWS_REGION: "us-east-1"</div>
                <div>NODE_ENV: "production"</div>
                <div>DESIRED_TASKS: 8</div>
              </div>
            </div>
          </div>
        )}

        {/* EXTENSIONS TAB */}
        {activeTab === 'extensions' && (
          <div className="p-2 space-y-2">
            <div className="text-[10px] font-bold text-[#888888] px-1">INSTALLED (6)</div>
            {[
              { name: 'AWS Toolkit', author: 'Amazon Web Services', desc: 'AWS Lambda, CloudWatch & ECS' },
              { name: 'HashiCorp Terraform', author: 'HashiCorp', desc: 'Syntax highlighting & linting' },
              { name: 'Kubernetes', author: 'Microsoft', desc: 'K8s manifests and cluster control' },
              { name: 'Python', author: 'Microsoft', desc: 'IntelliSense, Linting & Debugging' },
              { name: 'Prettier', author: 'Prettier', desc: 'Code formatter' },
              { name: 'GitLens', author: 'GitKraken', desc: 'Supercharge Git within VS Code' }
            ].map(ext => (
              <div key={ext.name} className="flex gap-2 p-1.5 hover:bg-[#2a2d2e] rounded cursor-pointer">
                <div className="w-7 h-7 rounded bg-[#3c3c3c] flex items-center justify-center text-white shrink-0 font-bold text-[10px]">
                  {ext.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="font-medium text-[11px] text-white truncate">{ext.name}</div>
                  <div className="text-[10px] text-[#888888] truncate">{ext.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
