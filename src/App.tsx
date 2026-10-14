/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AndroidEmulator } from './components/AndroidEmulator';
import { CodeViewer } from './components/CodeViewer';
import { ArchitectureGuide } from './components/ArchitectureGuide';
import { 
  Smartphone, 
  Code2, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Check, 
  Copy,
  Layers,
  Terminal,
  ExternalLink,
  Github
} from 'lucide-react';
import { ANDROID_CODE_FILES } from './data/androidCodeSnippets';

export default function App() {
  const [activeTab, setActiveTab] = useState<'emulator' | 'code' | 'architecture'>('emulator');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAllCode = () => {
    const fullText = ANDROID_CODE_FILES.map(
      file => `// ==========================================\n// File: ${file.path}\n// ${file.description}\n// ==========================================\n\n${file.code}\n\n`
    ).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md shadow-pink-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-white tracking-tight">Android Dating App</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold font-mono">
                  Kotlin + Compose
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Chuẩn kiến trúc MVVM • Thư viện Coil • Material 3
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('emulator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'emulator'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Máy ảo Android</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Mã nguồn Kotlin</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kiến trúc & Cài đặt</span>
              <span className="sm:hidden">Kiến trúc</span>
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={handleCopyAllCode}
            className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-all active:scale-95 shadow-xs"
            title="Sao chép toàn bộ mã nguồn các tệp vào Clipboard"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Đã chép tất cả!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-pink-400" />
                <span>Sao chép tất cả tệp</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {activeTab === 'emulator' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live Interactive Device Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AndroidEmulator />
            </div>

            {/* Right Column: Architectural Highlights & Quick Code Insights */}
            <div className="lg:col-span-7 space-y-6">
              {/* Highlight Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-pink-950/30 border border-slate-800 shadow-xl">
                <div className="flex items-center space-x-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Tổng quan dự án Android Native</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Ứng dụng Hẹn hò (Dating App) Jetpack Compose
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Được xây dựng đúng theo quy chuẩn kỹ thuật Google Android Architecture:
                  sử dụng <strong>Data Class bất biến</strong>, <strong>StateFlow trong DatingViewModel</strong> và giao diện khai báo <strong>Jetpack Compose</strong> tích hợp thư viện ảnh <strong>Coil</strong>.
                </p>

                {/* Key Checklist Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Ngôn ngữ</span>
                    <span className="text-xs font-bold text-white">Kotlin 2.0+</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Giao diện (UI)</span>
                    <span className="text-xs font-bold text-pink-400">Jetpack Compose</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Kiến trúc</span>
                    <span className="text-xs font-bold text-purple-400">MVVM + StateFlow</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Tải ảnh URL</span>
                    <span className="text-xs font-bold text-cyan-400">Coil Compose</span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                    <Check className="w-4 h-4" />
                    <span>1. Data Model (UserProfile)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Đầy đủ 6 trường dữ liệu: <code className="text-pink-300">id</code>, <code className="text-pink-300">name</code>, <code className="text-pink-300">age</code>, <code className="text-pink-300">bio</code>, <code className="text-pink-300">imageUrl</code>, <code className="text-pink-300">distance</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                    <Check className="w-4 h-4" />
                    <span>2. DatingViewModel</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Quản lý danh sách hồ sơ mẫu, hàm <code className="text-purple-300">onSwipeLeft()</code> (Bỏ qua), <code className="text-purple-300">onSwipeRight()</code> (Thích) và cơ chế cập nhật StateFlow bất biến.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                    <Check className="w-4 h-4" />
                    <span>3. Thẻ Hồ Sơ & Coil AsyncImage</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Ảnh phủ tràn thẻ với gradient bóng đen dưới đáy, hiển thị tên, tuổi, vị trí và tiểu sử rõ ràng.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                    <Check className="w-4 h-4" />
                    <span>4. Trạng thái hết hồ sơ (Empty State)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Thông báo rõ ràng <em>"Không còn hồ sơ nào gần bạn"</em> kèm nút <strong>Tải lại hồ sơ</strong> để người dùng tiếp tục trải nghiệm.
                  </p>
                </div>
              </div>

              {/* Quick switch to code button */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">Muốn xem trực tiếp mã nguồn chi tiết?</span>
                  <p className="text-slate-400">Xem toàn bộ các file Kotlin, gradle dependencies và hướng dẫn build.</p>
                </div>
                <button
                  onClick={() => setActiveTab('code')}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Mở Code Viewer</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-pink-400" />
                  <span>Trình duyệt Mã Nguồn Android Native (Kotlin)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Các tệp mã nguồn sạch, chuẩn kiến trúc MVVM, sẵn sàng sao chép vào Android Studio.
                </p>
              </div>

              <button
                onClick={handleCopyAllCode}
                className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? "Đã chép tất cả tệp!" : "Sao chép toàn bộ dự án"}</span>
              </button>
            </div>

            <div className="flex-1">
              <CodeViewer />
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="flex-1 bg-slate-100 text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
                <Layers className="w-6 h-6 text-pink-600" />
                <span>Giải thích Chi Tiết Kiến Trúc & Thiết Kế</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Tìm hiểu sâu về cách hoạt động của Unidirectional Data Flow, cử chỉ kéo thẻ và tích hợp Coil.
              </p>
            </div>
            <ArchitectureGuide />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>Android Dating App • Kotlin 2.0 • Jetpack Compose • Material 3 • Coil Compose</p>
      </footer>
    </div>
  );
}
