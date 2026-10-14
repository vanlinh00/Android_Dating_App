import React, { useState } from 'react';
import { ANDROID_CODE_FILES, CodeFile } from '../data/androidCodeSnippets';
import { Copy, Check, FileCode, Folder, Terminal, Sparkles, FolderTree, Layers } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(ANDROID_CODE_FILES[6]); // Default DatingScreen.kt
  const [copied, setCopied] = useState<boolean>(false);
  const [activeLayerFilter, setActiveLayerFilter] = useState<string>('ALL');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = activeLayerFilter === 'ALL' 
    ? ANDROID_CODE_FILES 
    : ANDROID_CODE_FILES.filter(f => f.layer === activeLayerFilter);

  const lines = selectedFile.code.split('\n');

  const layerColors: Record<string, { bg: string; text: string; border: string }> = {
    Gradle: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    Domain: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    Data: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    Presentation: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
    Theme: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[660px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Sidebar: File list & Senior Architecture Tree */}
      <div className="w-full lg:w-80 bg-slate-950/90 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between">
        <div>
          {/* Header & Filter */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2 text-slate-300">
              <FolderTree className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Project Tree (Senior)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold border border-emerald-500/30">
              Clean Arch
            </span>
          </div>

          {/* Layer Filter Chips */}
          <div className="flex flex-wrap gap-1 mb-3 pb-2 border-b border-slate-800/80">
            {['ALL', 'Domain', 'Data', 'Presentation', 'Gradle'].map(layer => (
              <button
                key={layer}
                onClick={() => setActiveLayerFilter(layer)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                  activeLayerFilter === layer
                    ? 'bg-pink-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          {/* File list */}
          <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
            {filteredFiles.map((file) => {
              const isSelected = file.filename === selectedFile.filename;
              const badge = layerColors[file.layer] || { bg: 'bg-slate-800', text: 'text-slate-400', border: 'border-slate-700' };
              
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all group ${
                    isSelected
                      ? 'bg-pink-500/15 text-pink-300 border border-pink-500/40 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                    <span className="truncate">{file.filename}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-sans ${badge.bg} ${badge.text} ${badge.border}`}>
                    {file.layer}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Senior Architecture Standards Badge */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-slate-200 font-semibold">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span>Senior Android Pattern</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            • <strong>Version Catalog</strong> (libs.versions.toml)<br />
            • <strong>DIP / Repository Pattern</strong> (Domain ↔ Data)<br />
            • <strong>MVI / UDF Contracts</strong> (UiState + UiAction)<br />
            • <strong>Stateless & Stateful Composable</strong>
          </p>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
        {/* Header bar */}
        <div className="h-12 px-4 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="font-mono text-slate-400 text-xs truncate">{selectedFile.path}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {lines.length} dòng
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
                  <span>Sao chép file</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Description Banner */}
        <div className="px-4 py-2.5 bg-slate-800/40 border-b border-slate-800/60 text-xs text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span className="leading-tight">{selectedFile.description}</span>
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

function formatKotlinSyntax(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  if (line.trim().startsWith('@')) {
    return <span className="text-amber-400 font-semibold">{line}</span>;
  }

  return (
    <span>
      {line.split(/(\b(?:package|import|data|class|interface|object|sealed|val|var|fun|if|else|when|for|in|return|private|override|suspend|is|as|true|false|null|emptyList|listOf)\b)/g).map((part, i) => {
        if (/^(package|import|data|class|interface|object|sealed|val|var|fun|if|else|when|for|in|return|private|override|suspend|is|as|true|false|null)$/.test(part)) {
          return <span key={i} className="text-pink-400 font-semibold">{part}</span>;
        }
        if (/^(UserProfile|DatingRepository|DatingRepositoryImpl|DatingViewModel|DatingUiState|DatingUiAction|DatingUiEffect|StateFlow|MutableStateFlow|Flow|Channel|Composable|Scaffold|TopAppBar|Card|Box|Column|Row|Text|Icon|Button|AsyncImage|Animatable|Modifier|Result)$/.test(part)) {
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
