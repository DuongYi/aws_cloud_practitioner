import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Plus, Trash2, X, ChevronUp, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-react';
import { INITIAL_TERMINAL_LOGS } from '../../data/fakeCodeData';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeTerminalProps {
  onClose: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

export const VSCodeTerminal: React.FC<VSCodeTerminalProps> = ({
  onClose,
  isMaximized,
  onToggleMaximize
}) => {
  const [activeTab, setActiveTab] = useState<'bash' | 'dev' | 'tf' | 'docker'>('bash');
  const [bashLogs, setBashLogs] = useState<string[]>(INITIAL_TERMINAL_LOGS);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bashLogs, activeTab]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    keyboardAudio.playKeyClick('enter');
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const promptLine = `developer@aws-prod-cluster:~/enterprise-core$ ${cmd}`;
    const newLogs = [...bashLogs, promptLine];

    const lower = cmd.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setBashLogs([]);
      setInputValue('');
      return;
    }

    if (lower === 'help') {
      newLogs.push(
        "Available simulator commands:",
        "  help              - Show this command reference",
        "  git status        - Inspect working tree & branch diff",
        "  git diff          - View color-coded git diff",
        "  terraform apply   - Simulate multi-AZ infrastructure deployment",
        "  npm run test      - Run enterprise unit & integration test suites",
        "  docker ps         - List active container clusters",
        "  aws s3 ls         - List protected enterprise S3 buckets",
        "  htop / top        - Real-time CPU & worker thread usage",
        "  matrix            - Enter hacker matrix digital rain stream",
        "  clear             - Clear terminal screen",
        "  (Tip: Type ANY random text and press Enter to simulate realistic work logs!)"
      );
    } else if (lower.startsWith('git status')) {
      newLogs.push(
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "",
        "Changes not staged for commit:",
        "  (use \"git add <file>...\" to update what will be committed)",
        "  \x1b[33mmodified:   src/services/cloud-orchestrator.ts\x1b[0m",
        "  \x1b[33mmodified:   infra/terraform/main.tf\x1b[0m",
        "",
        "Untracked files:",
        "  \x1b[31mdeploy/k8s/cluster-prod.yaml\x1b[0m",
        "",
        "no changes added to commit (use \"git add\")"
      );
    } else if (lower.startsWith('git diff')) {
      newLogs.push(
        "\x1b[1mdiff --git a/src/services/cloud-orchestrator.ts b/src/services/cloud-orchestrator.ts\x1b[0m",
        "--- a/src/services/cloud-orchestrator.ts",
        "+++ b/src/services/cloud-orchestrator.ts",
        "@@ -42,7 +42,9 @@ export class CloudInfrastructureManager {",
        "-\x1b[31m-  private maxRetries: number = 3;\x1b[0m",
        "+\x1b[32m+  private maxRetries: number = 15; // Increased for multi-region resilience\x1b[0m",
        "+\x1b[32m+  private jitterMs: number = 250;\x1b[0m"
      );
    } else if (lower.startsWith('terraform apply')) {
      newLogs.push(
        "\x1b[36mInitializing Terraform AWS Provider v5.40.0...\x1b[0m",
        "aws_vpc.core: Refreshing state... [id=vpc-082ab91c4f]",
        "aws_subnet.private_1a: Refreshing state... [id=subnet-09f18a]",
        "aws_eks_cluster.primary: Modifying... [id=aws-prod-k8s-cluster]",
        "aws_lb.external_alb: Plan: 2 to add, 1 to change, 0 to destroy.",
        "\x1b[32mApply complete! Resources: 2 added, 1 changed, 0 destroyed.\x1b[0m",
        "Outputs:",
        "  alb_dns_name = \"core-services-alb-prod-10928374.us-east-1.elb.amazonaws.com\""
      );
    } else if (lower.includes('exam') || lower.includes('test:exam')) {
      newLogs.push(
        "\x1b[36m> vitest run tests/exams/clf-c02-practice-exam-1.spec.ts\x1b[0m",
        "",
        " \x1b[32m✓\x1b[0m tests/exams/clf-c02-practice-exam-1.spec.ts (65 tests) 1240ms",
        "   \x1b[32m✓\x1b[0m Domain 1: Cloud Concepts (16/16 passed)",
        "   \x1b[32m✓\x1b[0m Domain 2: Security & Compliance (20/20 passed)",
        "   \x1b[32m✓\x1b[0m Domain 3: Cloud Technology & Services (22/22 passed)",
        "   \x1b[32m✓\x1b[0m Domain 4: Billing, Pricing & Support (7/7 passed)",
        "",
        "\x1b[32mPASS\x1b[0m All 65 exam scenarios validated. Final Score: \x1b[32m890/1000 (PASSED)\x1b[0m",
        "(Mẹo: Bạn có thể click file 'clf-c02-practice-exam-1.spec.ts' trên thanh file tree để làm bài thi trực tiếp!)"
      );
    } else if (lower.startsWith('npm') || lower.startsWith('yarn') || lower.startsWith('pnpm')) {
      newLogs.push(
        "> enterprise-core@4.18.2 test",
        "> vitest run --coverage",
        "",
        " ✓ src/services/cloud-orchestrator.test.ts (14 tests) 142ms",
        " ✓ src/security/token-verifier.test.ts (22 tests) 98ms",
        " ✓ src/infra/vpc-peering.test.ts (8 tests) 44ms",
        "",
        " Test Files  3 passed (3)",
        "      Tests  44 passed (44)",
        "   Duration  620ms (transform 48ms, setup 0ms, collect 112ms, tests 284ms)"
      );
    } else if (lower.startsWith('docker ps')) {
      newLogs.push(
        "CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS",
        "4a7b1c9e8d2f   enterprise/api-gw:v2     \"docker-entrypoint.s…\"   Up 4 hours     0.0.0.0:8080->8080/tcp",
        "1f8e2d3c4b5a   redis:7.2-alpine         \"docker-entrypoint.s…\"   Up 12 hours    0.0.0.0:6379->6379/tcp",
        "9c8b7a6d5e4f   localstack/localstack    \"docker-entrypoint.s…\"   Up 1 day       4566/tcp"
      );
    } else if (lower.startsWith('aws s3')) {
      newLogs.push(
        "2026-10-18 09:21:04 aws-enterprise-audit-logs-encrypted",
        "2026-10-19 14:15:52 aws-enterprise-tfstate-prod-useast1",
        "2026-10-21 23:42:10 aws-cloud-practitioner-dump-backups",
        "2026-10-22 04:00:00 aws-prod-k8s-backups-immutable"
      );
    } else if (lower.startsWith('top') || lower.startsWith('htop')) {
      newLogs.push(
        "Tasks: 184 total,   1 running, 183 sleeping,   0 stopped,   0 zombie",
        "%Cpu(s):  4.2 us,  1.1 sy,  0.0 ni, 94.6 id,  0.1 wa,  0.0 hi,  0.0 si",
        "MiB Mem :  64289.4 total,  41290.1 free,  14210.8 used,   8788.5 buff/cache",
        "",
        "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
        " 8192 admin     20   0 14.240g 4.120g 128912 S   9.8   6.4  12:44.20 node-worker",
        " 4096 docker    20   0  8.120g 2.140g  64128 S   4.2   3.3   8:19.45 dockerd",
        " 2048 postgres  20   0  4.096g 1.890g  42100 S   1.8   2.9   4:02.11 postgres"
      );
    } else if (lower === 'matrix') {
      newLogs.push(
        "\x1b[32m01000001 01010111 01010011 00100000 01000011 01001100 01001111 01010101 01000100\x1b[0m",
        "\x1b[32m[SYS] NEURAL MATRIX LINK ACTIVE: DECRYPTING QUANTUM STREAM 0x9AF831...\x1b[0m",
        "\x1b[32m[AWS] LAMBDA CONCURRENCY LIMIT: 10,000 EXECUTIONS/SEC -> AUTONOMOUS OPTIMIZATION APPLIED\x1b[0m"
      );
    } else {
      // Realistic fallback for gibberish mashing
      newLogs.push(
        `[EXEC] Process started: ${cmd}`,
        `[LOG] Spawning container daemon with context ${Math.floor(Math.random() * 9000 + 1000)}...`,
        `[STATUS] Reconciled 14 cluster tasks. Health status: OK (latency 12ms)`
      );
    }

    setBashLogs(newLogs);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    keyboardAudio.playKeyClick(e.key === 'Enter' ? 'enter' : e.key === ' ' ? 'space' : 'char');
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputValue(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const renderLogLine = (line: string, idx: number) => {
    // Basic ANSI color rendering
    let processed = line
      .replace(/\x1b\[32m/g, '<span style="color: #4ec9b0; font-weight: 600;">')
      .replace(/\x1b\[33m/g, '<span style="color: #dcdcaa;">')
      .replace(/\x1b\[34m/g, '<span style="color: #569cd6;">')
      .replace(/\x1b\[35m/g, '<span style="color: #c586c0;">')
      .replace(/\x1b\[36m/g, '<span style="color: #4fc1ff;">')
      .replace(/\x1b\[31m/g, '<span style="color: #f14c4c;">')
      .replace(/\x1b\[1m/g, '<span style="font-weight: bold; color: #ffffff;">')
      .replace(/\x1b\[0m/g, '</span>');

    return (
      <div 
        key={idx} 
        className="font-mono text-[12px] leading-[19px] whitespace-pre-wrap select-text text-[#cccccc]"
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  };

  return (
    <div 
      className="flex flex-col border-t border-[#3c3c3c] bg-[#181818] text-[#cccccc] font-mono select-none"
      style={{ height: isMaximized ? 'calc(100vh - 80px)' : '240px', transition: 'height 0.2s ease' }}
    >
      {/* Terminal Title Bar Tabs */}
      <div className="flex items-center justify-between px-3 h-[34px] border-b border-[#2d2d2d] bg-[#1e1e1e] text-[11px]">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bash')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'bash' ? 'bg-[#181818] text-white font-medium border-t-2 border-[#007acc]' : 'text-[#888888] hover:text-[#cccccc]'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#4ec9b0]" />
            <span>bash: prod-us-east-1</span>
          </button>

          <button
            onClick={() => setActiveTab('dev')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'dev' ? 'bg-[#181818] text-white font-medium border-t-2 border-[#007acc]' : 'text-[#888888] hover:text-[#cccccc]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>npm run dev (ready: 3000)</span>
          </button>

          <button
            onClick={() => setActiveTab('tf')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'tf' ? 'bg-[#181818] text-white font-medium border-t-2 border-[#007acc]' : 'text-[#888888] hover:text-[#cccccc]'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#569cd6]" />
            <span>terraform: applied</span>
          </button>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1 text-[#888888]">
          <button 
            onClick={() => setBashLogs(prev => [...prev, "[\x1b[36mNEW\x1b[0m] Spawned auxiliary terminal session"])}
            className="p-1 hover:text-white rounded hover:bg-[#2d2d2d]" 
            title="New Terminal"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setBashLogs([])} 
            className="p-1 hover:text-white rounded hover:bg-[#2d2d2d]" 
            title="Clear Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={onToggleMaximize} 
            className="p-1 hover:text-white rounded hover:bg-[#2d2d2d]" 
            title={isMaximized ? "Restore Panel" : "Maximize Panel"}
          >
            {isMaximized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={onClose} 
            className="p-1 hover:text-white rounded hover:bg-[#2d2d2d]" 
            title="Close Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div 
        className="flex-1 overflow-y-auto p-3 space-y-1 select-text scrollbar-thin"
        onClick={() => inputRef.current?.focus()}
      >
        {activeTab === 'bash' && (
          <>
            {bashLogs.map((line, idx) => renderLogLine(line, idx))}
            
            {/* Command Line Input */}
            <div className="flex items-center gap-2 pt-1 font-mono text-[12px]">
              <span className="text-[#4ec9b0] select-none font-semibold">developer@aws-prod-cluster:~/enterprise-core$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono text-[12px] p-0 caret-[#007acc]"
                autoFocus
                spellCheck={false}
              />
            </div>
          </>
        )}

        {activeTab === 'dev' && (
          <div className="space-y-1 text-[12px]">
            <p className="text-[#4ec9b0]">  VITE v8.3.0  ready in 184 ms</p>
            <p className="text-white">  ➜  Local:   <span className="text-[#569cd6] underline">http://localhost:3000/</span></p>
            <p className="text-white">  ➜  Network: <span className="text-[#569cd6] underline">http://192.168.1.104:3000/</span></p>
            <p className="text-[#888888] pt-2">  [vite] hmr update /src/services/cloud-orchestrator.ts</p>
            <p className="text-[#888888]">  [vite] 2 modules transformed.</p>
            <p className="text-[#dcdcaa] pt-1">  ✓ Compiled successfully without warnings.</p>
          </div>
        )}

        {activeTab === 'tf' && (
          <div className="space-y-1 text-[12px]">
            <p className="text-[#569cd6]">aws_vpc.core: Refreshing state... [id=vpc-082ab91c4f]</p>
            <p className="text-[#569cd6]">aws_subnet.private_1a: Refreshing state... [id=subnet-09f18a]</p>
            <p className="text-[#4ec9b0] font-semibold pt-2">Apply complete! Resources: 14 added, 2 changed, 0 destroyed.</p>
            <p className="text-[#cccccc]">State lock released in DynamoDB table 'terraform-locks-prod'.</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
