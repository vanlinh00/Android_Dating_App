import React from 'react';
import { Layers, Image as ImageIcon, Zap, CheckCircle2, ShieldCheck, Compass, GitBranch, ArrowRight } from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-800">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">1. Model (UserProfile)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kotlin Data class bất biến (immutable), mang đầy đủ các trường id, name, age, bio, imageUrl, distance.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-blue-600">
            data class UserProfile(...)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">2. ViewModel (DatingViewModel)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nắm giữ StateFlow đơn nguồn chân lý (Single Source of Truth), cung cấp mock data 5 hồ sơ, quản lý hàm onSwipeLeft() và onSwipeRight().
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-purple-600">
            StateFlow&lt;DatingUiState&gt;
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">3. View (Jetpack Compose)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              DatingScreen Composable nhận dữ liệu qua `collectAsStateWithLifecycle()`, dùng Coil `AsyncImage` tải ảnh URL, và xử lý hiệu ứng quẹt thẻ mượt mà.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-pink-600">
            @Composable fun DatingScreen()
          </div>
        </div>
      </div>

      {/* MVVM Flow Diagram */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Compass className="w-5 h-5 text-pink-500" />
          <span>Luồng dữ liệu một chiều (Unidirectional Data Flow - UDF)</span>
        </h3>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex-1 text-center p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-slate-900">Jetpack Compose UI</div>
            <div className="text-[11px] text-slate-500 mt-1">Người dùng Quẹt thẻ / Bấm nút</div>
          </div>

          <div className="flex items-center text-slate-400 font-sans text-xs">
            <span className="hidden md:inline">Sự kiện (Event)</span>
            <ArrowRight className="w-4 h-4 mx-2 text-pink-500" />
          </div>

          <div className="flex-1 text-center p-3 rounded-lg bg-purple-50 border border-purple-200 shadow-xs">
            <div className="font-bold text-purple-900">DatingViewModel</div>
            <div className="text-[11px] text-purple-600 mt-1">onSwipeLeft() / onSwipeRight()</div>
          </div>

          <div className="flex items-center text-slate-400 font-sans text-xs">
            <span className="hidden md:inline">Cập nhật State</span>
            <ArrowRight className="w-4 h-4 mx-2 text-purple-500" />
          </div>

          <div className="flex-1 text-center p-3 rounded-lg bg-emerald-50 border border-emerald-200 shadow-xs">
            <div className="font-bold text-emerald-900">DatingUiState (StateFlow)</div>
            <div className="text-[11px] text-emerald-600 mt-1">Recompose thẻ tiếp theo / Hết thẻ</div>
          </div>
        </div>
      </div>

      {/* Deep-dive points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coil Image Loading */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2.5 text-slate-900 font-bold">
            <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h4>Tải ảnh qua Coil trong Jetpack Compose</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Coil là thư viện tải ảnh tiêu chuẩn hiện đại nhất cho Android & Jetpack Compose:
          </p>
          <ul className="text-xs space-y-2 text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Sử dụng composable <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-pink-600">AsyncImage</code> hỗ trợ caching, placeholder và cắt hình tự động.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Kèm theo quyền <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">&lt;uses-permission android:name="android.permission.INTERNET"/&gt;</code> trong <code className="font-mono">AndroidManifest.xml</code>.</span>
            </li>
          </ul>
        </div>

        {/* Gestures and Animation */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2.5 text-slate-900 font-bold">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
            <h4>Xử lý cử chỉ quẹt (Swipe Gestures)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Khai thác sức mạnh của hệ thống cử chỉ và animation trong Jetpack Compose:
          </p>
          <ul className="text-xs space-y-2 text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Dùng <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-pink-600">pointerInput</code> kết hợp <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-pink-600">detectDragGestures</code> để nhận diện tọa độ kéo ngón tay.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Biến đổi góc nghiêng <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">rotationZ</code> và độ dịch chuyển <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">translationX</code> qua <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">graphicsLayer</code> để đạt 60fps mượt mà không gây recomposition dư thừa.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Steps to run in Android Studio */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-lg space-y-4">
        <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>Hướng dẫn chạy mã trên Android Studio</span>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
          <li>Mở <strong>Android Studio</strong> (Ladybug / Koala hoặc mới nhất) và tạo một project mới dạng <strong>Empty Activity (Compose)</strong>.</li>
          <li>Mở tệp <code className="text-pink-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">app/build.gradle.kts</code>, thêm dependency <code className="text-pink-300 font-mono">io.coil-kt:coil-compose:2.7.0</code> rồi bấm <strong>Sync Now</strong>.</li>
          <li>Tạo các package tương ứng: <code className="text-pink-300 font-mono">data.model</code>, <code className="text-pink-300 font-mono">ui</code> và sao chép các tệp <code className="text-pink-300 font-mono">UserProfile.kt</code>, <code className="text-pink-300 font-mono">DatingViewModel.kt</code>, <code className="text-pink-300 font-mono">DatingScreen.kt</code>.</li>
          <li>Thêm quyền <code className="text-pink-300 font-mono">android.permission.INTERNET</code> vào <code className="text-pink-300 font-mono">AndroidManifest.xml</code>.</li>
          <li>Nhấn nút <strong>Run 'app'</strong> (Shift + F10) để khởi chạy trên máy ảo Android Emulator hoặc thiết bị thật!</li>
        </ol>
      </div>
    </div>
  );
};
