import React, { useState } from 'react';
import { ANDROID_CODE_FILES, CodeFile } from '../data/androidCodeSnippets';
import { Copy, Check, FileCode, Folder, ExternalLink, Terminal, Sparkles } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(ANDROID_CODE_FILES[3]); // Default DatingScreen.kt
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = selectedFile.code.split('\n');

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[640px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Sidebar: File list */}
      <div className="w-full lg:w-72 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-slate-300 mb-3 px-2">
            <Folder className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tệp Mã Nguồn Android</span>
          </div>

          <div className="space-y-1">
            {ANDROID_CODE_FILES.map((file) => {
              const isSelected = file.filename === selectedFile.filename;
              return (
                <button
                  key={file.filename}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`} />
                    <span className="truncate">{file.filename}</span>
                  </div>
                  {file.filename === 'DatingScreen.kt' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-sans">
                      UI
                    </span>
                  )}
                  {file.filename === 'DatingViewModel.kt' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-sans">
                      VM
                    </span>
                  )}
                  {file.filename === 'UserProfile.kt' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-sans">
                      Model
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Info box */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-slate-200 font-medium">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chuẩn kiến trúc MVVM</span>
          </div>
          <p className="text-slate-400 leading-normal">
            Phân tách rành mạch: Model (Dữ liệu), ViewModel (StateFlow), View (Jetpack Compose).
          </p>
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
        {/* Header bar */}
        <div className="h-12 px-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="font-mono text-slate-400 truncate">{selectedFile.path}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {lines.length} dòng ({selectedFile.language})
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium transition-all active:scale-95 text-xs shadow-sm shadow-pink-900/40"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Description Banner */}
        <div className="px-4 py-2.5 bg-slate-800/40 border-b border-slate-800/60 text-xs text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>{selectedFile.description}</span>
        </div>

        {/* Code Content Area */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 leading-relaxed selection:bg-pink-500/30">
          <div className="table w-full">
            {lines.map((line, index) => (
              <div key={index} className="table-row hover:bg-slate-800/50">
                <span className="table-cell select-none pr-4 text-right text-slate-600 text-[11px] w-10">
                  {index + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono">
                  {formatKotlinSyntax(line)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Lightweight syntax colorizer for Kotlin/Compose keywords in UI
 */
function formatKotlinSyntax(line: string) {
  // Comment line
  if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Annotation
  if (line.trim().startsWith('@')) {
    return <span className="text-amber-400 font-semibold">{line}</span>;
  }

  return (
    <span>
      {line.split(/(\b(?:package|import|data|class|val|var|fun|if|else|when|for|in|return|private|override|is|as|true|false|null|emptyList|listOf)\b)/g).map((part, i) => {
        if (/^(package|import|data|class|val|var|fun|if|else|when|for|in|return|private|override|is|as|true|false|null)$/.test(part)) {
          return <span key={i} className="text-pink-400 font-semibold">{part}</span>;
        }
        if (/^(UserProfile|DatingViewModel|DatingUiState|StateFlow|MutableStateFlow|Composable|Scaffold|TopAppBar|Card|Box|Column|Row|Text|Icon|Button|AsyncImage|Animatable|Modifier)$/.test(part)) {
          return <span key={i} className="text-cyan-300">{part}</span>;
        }
        if (part.includes('"')) {
          return <span key={i} className="text-emerald-300">{part}</span>;
        }
        return part;
      })}
    </span>
  );
}
