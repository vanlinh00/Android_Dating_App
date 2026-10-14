import React from 'react';
import { 
  Layers, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  GitBranch, 
  ArrowRight,
  FolderTree,
  FileCode2,
  Cpu,
  Boxes
} from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-800">
      {/* Senior Architectural Philosophy */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-400 text-[11px] font-mono font-semibold border border-pink-500/30">
            <Boxes className="w-3.5 h-3.5" />
            <span>Senior Android Engineering Blueprint</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Chuẩn Cấu Trúc Dự Án Senior Android (Clean Arch + Feature-Driven)
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Thay vì gộp chung code vào 2-3 file tạm bợ, một Senior Engineer sẽ cấu trúc dự án theo 
            <strong> Feature-driven Clean Architecture</strong>: tách biệt rõ ràng <em>Domain</em> (Logic cốt lõi), 
            <em>Data</em> (Repository, Data Source) và <em>Presentation</em> (MVI, Compose).
          </p>
        </div>
      </div>

      {/* Senior File & Folder Tree Breakdown */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h4 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <FolderTree className="w-5 h-5 text-pink-500" />
          <span>Sơ đồ cây thư mục chuẩn sản xuất (Production Directory Tree)</span>
        </h4>

        <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto border border-slate-800">
          <pre>{`app/
├── gradle/
│   └── libs.versions.toml              <- [Senior] Version Catalog chuẩn Google, không hardcode version
├── build.gradle.kts                    <- [Senior] Áp dụng alias(libs.plugins...), Java 17, Compose 2.0
└── src/main/java/com/example/datingapp/
    ├── MainActivity.kt                 <- Entry point sạch sẽ, bật enableEdgeToEdge()
    │
    └── feature/dating/                 <- [Senior] Feature-Driven Package (dễ scale đa module)
        ├── domain/                     <- Tầng nghiệp vụ thuần túy, độc lập UI và Framework
        │   ├── model/
        │   │   └── UserProfile.kt      <- @Immutable data class (tối ưu Compose Recomposition)
        │   └── repository/
        │       └── DatingRepository.kt <- Interface trừu tượng tuân thủ DIP (Dependency Inversion)
        │
        ├── data/                       <- Tầng dữ liệu (Network/Database/Mock)
        │   └── repository/
        │       └── DatingRepositoryImpl.kt <- Triển khai Repository, xử lý Coroutines Dispatchers.IO
        │
        └── presentation/               <- Tầng hiển thị (MVI / Unidirectional Data Flow)
            ├── DatingUiState.kt        <- Hợp đồng MVI: UiState, UiAction, One-shot UiEffect
            ├── DatingViewModel.kt      <- StateFlow quản lý state, Channel phát Side-Effect
            ├── DatingScreen.kt         <- Tách biệt DatingRoute (Stateful) & DatingScreen (Stateless)
            └── components/             <- Các UI component con theo nguyên tắc Single Responsibility
                ├── ProfileCard.kt      <- Thẻ kéo thả kèm ảnh Coil AsyncImage & graphicsLayer
                ├── SwipeActionButtons.kt <- Nút Thích/Bỏ qua Material 3
                └── EmptyProfilesState.kt <- Trạng thái hết hồ sơ & nút Reload`}</pre>
        </div>
      </div>

      {/* 4 Pillars of Senior Android Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. MVI & UDF */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-pink-600 font-bold text-sm">
            <Compass className="w-4 h-4" />
            <h5>1. Hợp đồng MVI (UiState, UiAction, UiEffect)</h5>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Senior không gọi trực tiếp nhiều hàm rời rạc từ UI. Mọi tương tác người dùng được đóng gói thành <code className="bg-slate-100 px-1 py-0.5 rounded text-pink-600 font-mono">DatingUiAction</code> gửi vào 1 hàm duy nhất <code className="bg-slate-100 px-1 py-0.5 rounded text-pink-600 font-mono">onAction()</code>. 
            Các thông báo như Toast/Match Dialog được đẩy qua <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Channel&lt;DatingUiEffect&gt;</code> tránh bị duplicate khi xoay màn hình.
          </p>
        </div>

        {/* 2. Stateful vs Stateless Composables */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-purple-600 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <h5>2. Tách biệt Stateful Route & Stateless Screen</h5>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-purple-600">DatingRoute</code> nhận ViewModel và Lifecycle, trong khi <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-purple-600">DatingScreen</code> chỉ nhận dữ liệu thô (State) và lambda <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">onAction</code>. 
            Nhờ đó, màn hình có thể viết Unit Test giao diện và hiển thị <strong>@Preview</strong> tức thì trong Android Studio mà không cần mock ViewModel.
          </p>
        </div>

        {/* 3. Compose Stability & Performance */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <h5>3. Tối ưu Hiệu Năng Recomposition (@Immutable)</h5>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Các data class đều được gắn annotation <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-600 font-mono">@Immutable</code>. 
            Cử chỉ kéo thẻ sử dụng <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">graphicsLayer</code> để GPU tính toán góc xoay và độ dời mà không ép toàn bộ giao diện recompose lại liên tục, giữ vững 60-120fps.
          </p>
        </div>

        {/* 4. Dependency Inversion (DIP) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
            <GitBranch className="w-4 h-4" />
            <h5>4. Nguyên lý Đảo ngược phụ thuộc (DIP)</h5>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            ViewModel chỉ phụ thuộc vào interface <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">DatingRepository</code> ở tầng Domain. 
            Khi chuyển từ dữ liệu mẫu (Mock) sang Gọi API (Retrofit) hoặc Lưu trữ nội bộ (Room Database), tầng Presentation hoàn toàn không cần sửa đổi một dòng code nào.
          </p>
        </div>
      </div>
    </div>
  );
};
