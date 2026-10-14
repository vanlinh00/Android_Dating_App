export interface CodeFile {
  filename: string;
  path: string;
  language: string;
  description: string;
  code: string;
}

export const ANDROID_CODE_FILES: CodeFile[] = [
  {
    filename: "build.gradle.kts",
    path: "app/build.gradle.kts",
    language: "kotlin",
    description: "Khai báo dependencies: Jetpack Compose, Material 3, Coil và Lifecycle ViewModel.",
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.datingapp"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.datingapp"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // AndroidX Core & Lifecycle
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7")

    // Jetpack Compose & Material 3
    implementation(platform(libs.androidx.compose.bom))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Thư viện Coil tải ảnh từ URL cho Jetpack Compose
    implementation("io.coil-kt:coil-compose:2.7.0")

    // Activity Compose
    implementation("androidx.activity:activity-compose:1.9.3")

    // Test dependencies
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}`
  },
  {
    filename: "UserProfile.kt",
    path: "app/src/main/java/com/example/datingapp/data/model/UserProfile.kt",
    language: "kotlin",
    description: "Data Model đại diện cho một hồ sơ người dùng theo đúng yêu cầu.",
    code: `package com.example.datingapp.data.model

/**
 * Data Model lưu trữ thông tin hồ sơ người dùng
 * @property id Định danh duy nhất
 * @property name Tên hiển thị
 * @property age Tuổi
 * @property bio Tiểu sử ngắn
 * @property imageUrl Đường dẫn ảnh đại diện (URL)
 * @property distance Khoảng cách tới vị trí hiện tại
 */
data class UserProfile(
    val id: String,
    val name: String,
    val age: Int,
    val bio: String,
    val imageUrl: String,
    val distance: String
)`
  },
  {
    filename: "DatingViewModel.kt",
    path: "app/src/main/java/com/example/datingapp/ui/DatingViewModel.kt",
    language: "kotlin",
    description: "ViewModel quản lý StateFlow danh sách hồ sơ, mock data và các action vuốt/bỏ qua/thích.",
    code: `package com.example.datingapp.ui

import androidx.lifecycle.ViewModel
import com.example.datingapp.data.model.UserProfile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * UI State của màn hình hẹn hò
 */
data class DatingUiState(
    val profiles: List<UserProfile> = emptyList(),
    val lastActionMessage: String? = null
)

class DatingViewModel : ViewModel() {

    // Danh sách dữ liệu mẫu (Mock data 4-5 người dùng với ảnh chất lượng cao)
    private val initialProfiles = listOf(
        UserProfile(
            id = "1",
            name = "Mai Anh",
            age = 23,
            bio = "Thích cà phê sáng, sách và mèo. Tìm một người bạn cùng gu âm nhạc Indie! ☕🐱",
            imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            distance = "Cách bạn 2 km"
        ),
        UserProfile(
            id = "2",
            name = "Bảo Hân",
            age = 25,
            bio = "Đam mê nhiếp ảnh đường phố, du lịch phượt và nấu ăn cuối tuần. 📸✈️",
            imageUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
            distance = "Cách bạn 5 km"
        ),
        UserProfile(
            id = "3",
            name = "Hải Đăng",
            age = 26,
            bio = "Software Engineer ban ngày, guitarist ban đêm. Rất thích chạy bộ hồ Tây lúc hoàng hôn. 🎸💻",
            imageUrl = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            distance = "Cách bạn 3 km"
        ),
        UserProfile(
            id = "4",
            name = "Thảo My",
            age = 24,
            bio = "Thiết kế thời trang & mê gốm sứ. Luôn tràn đầy năng lượng tích cực ✨🎨",
            imageUrl = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            distance = "Cách bạn 7 km"
        ),
        UserProfile(
            id = "5",
            name = "Minh Khôi",
            age = 27,
            bio = "Kiến trúc sư yêu không gian xanh, thích tập gym và khám phá ẩm thực vỉa hè. 🏃‍♂️🍜",
            imageUrl = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
            distance = "Cách bạn 4 km"
        )
    )

    private val _uiState = MutableStateFlow(DatingUiState(profiles = initialProfiles))
    val uiState: StateFlow<DatingUiState> = _uiState.asStateFlow()

    /**
     * Bỏ qua hồ sơ hiện tại (Swipe Left / Bấm X)
     */
    fun onSwipeLeft() {
        _uiState.update { currentState ->
            val currentList = currentState.profiles
            if (currentList.isNotEmpty()) {
                val removed = currentList.first()
                currentState.copy(
                    profiles = currentList.drop(1),
                    lastActionMessage = "Đã bỏ qua \${removed.name}"
                )
            } else {
                currentState
            }
        }
    }

    /**
     * Thích hồ sơ hiện tại (Swipe Right / Bấm Trái tim)
     */
    fun onSwipeRight() {
        _uiState.update { currentState ->
            val currentList = currentState.profiles
            if (currentList.isNotEmpty()) {
                val liked = currentList.first()
                currentState.copy(
                    profiles = currentList.drop(1),
                    lastActionMessage = "Đã thích \${liked.name} ❤️"
                )
            } else {
                currentState
            }
        }
    }

    /**
     * Tải lại danh sách hồ sơ khi hết thẻ
     */
    fun resetProfiles() {
        _uiState.update {
            DatingUiState(profiles = initialProfiles, lastActionMessage = "Đã làm mới danh sách!")
        }
    }
}`
  },
  {
    filename: "DatingScreen.kt",
    path: "app/src/main/java/com/example/datingapp/ui/DatingScreen.kt",
    language: "kotlin",
    description: "Toàn bộ giao diện Jetpack Compose: Hiệu ứng quẹt thẻ cảm ứng, ảnh Coil, thông tin hồ sơ và các nút bấm Like / Pass.",
    code: `package com.example.datingapp.ui

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import com.example.datingapp.data.model.UserProfile
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DatingScreen(
    viewModel: DatingViewModel = viewModel(),
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val profiles = uiState.profiles

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Favorite,
                            contentDescription = "Logo",
                            tint = Color(0xFFFD297B)
                        )
                        Text(
                            text = "Dating Match",
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        modifier = modifier.fillMaxSize()
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFF6F8FB))
        ) {
            if (profiles.isEmpty()) {
                // Màn hình khi danh sách đã hết hồ sơ
                EmptyProfilesView(
                    onRefresh = { viewModel.resetProfiles() },
                    modifier = Modifier.align(Alignment.Center)
                )
            } else {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Khu vực chứa Thẻ Hồ Sơ xếp chồng (Profile Cards Stack)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        // Hiển thị tối đa 2 thẻ (thẻ dưới để tạo chiều sâu)
                        val visibleProfiles = profiles.take(2).reversed()
                        for (profile in visibleProfiles) {
                            val isTopCard = profile.id == profiles.first().id
                            ProfileCard(
                                profile = profile,
                                isTopCard = isTopCard,
                                onSwipeLeft = { viewModel.onSwipeLeft() },
                                onSwipeRight = { viewModel.onSwipeRight() }
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // 2 Nút bấm hành động bên dưới (Bỏ qua & Thích)
                    ActionButtonsRow(
                        onDislikeClick = { viewModel.onSwipeLeft() },
                        onLikeClick = { viewModel.onSwipeRight() },
                        modifier = Modifier.padding(bottom = 16.dp)
                    )
                }
            }
        }
    }
}

/**
 * Thẻ hiển thị hồ sơ cá nhân với cử chỉ kéo/quẹt (Drag to swipe)
 */
@Composable
fun ProfileCard(
    profile: UserProfile,
    isTopCard: Boolean,
    onSwipeLeft: () -> Unit,
    onSwipeRight: () -> Unit,
    modifier: Modifier = Modifier
) {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp
    val offsetX = remember { Animatable(0f) }
    val coroutineScope = rememberCoroutineScope()

    val dragModifier = if (isTopCard) {
        Modifier.pointerInput(profile.id) {
            detectDragGestures(
                onDrag = { change, dragAmount ->
                    change.consume()
                    coroutineScope.launch {
                        offsetX.snapTo(offsetX.value + dragAmount.x)
                    }
                },
                onDragEnd = {
                    val threshold = 280f
                    coroutineScope.launch {
                        when {
                            offsetX.value > threshold -> {
                                offsetX.animateTo(
                                    targetValue = 1200f,
                                    animationSpec = tween(durationMillis = 250)
                                )
                                onSwipeRight()
                            }
                            offsetX.value < -threshold -> {
                                offsetX.animateTo(
                                    targetValue = -1200f,
                                    animationSpec = tween(durationMillis = 250)
                                )
                                onSwipeLeft()
                            }
                            else -> {
                                // Trả về vị trí ban đầu nếu chưa vượt ngưỡng
                                offsetX.animateTo(0f, animationSpec = tween(durationMillis = 200))
                            }
                        }
                    }
                }
            )
        }
    } else {
        Modifier
    }

    // Tính góc nghiêng (rotation) theo khoảng cách kéo
    val rotation = (offsetX.value / 60f).coerceIn(-20f, 20f)

    Card(
        shape = RoundedCornerShape(24.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isTopCard) 8.dp else 3.dp),
        modifier = modifier
            .fillMaxWidth()
            .fillMaxHeight(0.92f)
            .graphicsLayer {
                translationX = offsetX.value
                rotationZ = rotation
                if (!isTopCard) {
                    scaleX = 0.95f
                    scaleY = 0.95f
                }
            }
            .then(dragModifier)
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Ảnh đại diện tải từ URL qua thư viện Coil
            AsyncImage(
                model = profile.imageUrl,
                contentDescription = profile.name,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Lớp Gradient phủ đen dần từ giữa xuống đáy để làm nổi bật chữ
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Transparent,
                                Color.Black.copy(alpha = 0.2f),
                                Color.Black.copy(alpha = 0.85f)
                            ),
                            startY = 400f
                        )
                    )
            )

            // Nhãn hiển thị khi đang kéo sang trái hoặc phải
            if (isTopCard && kotlin.math.abs(offsetX.value) > 40f) {
                if (offsetX.value > 0) {
                    Text(
                        text = "LIKE",
                        color = Color(0xFF22C55E),
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black,
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .padding(24.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color.White.copy(alpha = 0.85f))
                            .padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                } else {
                    Text(
                        text = "NOPE",
                        color = Color(0xFFEF4444),
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black,
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .padding(24.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color.White.copy(alpha = 0.85f))
                            .padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                }
            }

            // Thông tin người dùng đè lên góc dưới của ảnh
            Column(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                // Tên và Tuổi
                Row(verticalAlignment = Alignment.Bottom) {
                    Text(
                        text = profile.name,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "\${profile.age}",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Normal,
                        color = Color.White.copy(alpha = 0.9f)
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))

                // Khoảng cách
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.LocationOn,
                        contentDescription = "Vị trí",
                        tint = Color(0xFFE2E8F0),
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = profile.distance,
                        fontSize = 14.sp,
                        color = Color(0xFFE2E8F0)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Tiểu sử (Bio)
                Text(
                    text = profile.bio,
                    fontSize = 15.sp,
                    lineHeight = 20.sp,
                    color = Color.White.copy(alpha = 0.95f),
                    maxLines = 3
                )
            }
        }
    }
}

/**
 * 2 Nút bấm chính: Bỏ qua (X) và Thích (Trái tim)
 */
@Composable
fun ActionButtonsRow(
    onDislikeClick: () -> Unit,
    onLikeClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Nút Bỏ qua (X - Màu đỏ)
        IconButton(
            onClick = onDislikeClick,
            modifier = Modifier
                .size(68.dp)
                .shadow(elevation = 6.dp, shape = CircleShape)
                .clip(CircleShape)
                .background(Color.White)
        ) {
            Icon(
                imageVector = Icons.Default.Close,
                contentDescription = "Bỏ qua",
                tint = Color(0xFFEF4444), // Đỏ
                modifier = Modifier.size(36.dp)
            )
        }

        // Nút Thích (Trái tim - Gradient hồng / đỏ cam)
        IconButton(
            onClick = onLikeClick,
            modifier = Modifier
                .size(68.dp)
                .shadow(elevation = 6.dp, shape = CircleShape)
                .clip(CircleShape)
                .background(Color.White)
        ) {
            Icon(
                imageVector = Icons.Default.Favorite,
                contentDescription = "Thích",
                tint = Color(0xFFFD297B), // Hồng cam quyến rũ
                modifier = Modifier.size(36.dp)
            )
        }
    }
}

/**
 * Hiển thị khi danh sách hết thẻ hồ sơ
 */
@Composable
fun EmptyProfilesView(
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(100.dp)
                .clip(CircleShape)
                .background(Color(0xFFFFEDF2)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Favorite,
                contentDescription = null,
                tint = Color(0xFFFD297B),
                modifier = Modifier.size(52.dp)
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Không còn hồ sơ nào gần bạn",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Bạn đã xem hết các gợi ý hôm nay. Hãy mở rộng phạm vi tìm kiếm hoặc làm mới để xem lại.",
            fontSize = 14.sp,
            color = Color.Gray,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = onRefresh,
            shape = RoundedCornerShape(24.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFFD297B)
            ),
            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp)
        ) {
            Icon(
                imageVector = Icons.Default.Refresh,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Tải lại hồ sơ",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}
`
  },
  {
    filename: "MainActivity.kt",
    path: "app/src/main/java/com/example/datingapp/MainActivity.kt",
    language: "kotlin",
    description: "Activity khởi chạy chính kết nối DatingScreen vào Jetpack Compose setContent.",
    code: `package com.example.datingapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.datingapp.ui.DatingScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    DatingScreen()
                }
            }
        }
    }
}
`
  },
  {
    filename: "AndroidManifest.xml",
    path: "app/src/main/AndroidManifest.xml",
    language: "xml",
    description: "Cấp quyền truy cập INTERNET để thư viện Coil tải ảnh từ URL.",
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Cần quyền INTERNET để tải ảnh từ URL qua Coil -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.DatingApp">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.DatingApp">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  }
];
