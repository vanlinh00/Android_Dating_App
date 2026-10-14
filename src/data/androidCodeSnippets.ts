export interface CodeFile {
  filename: string;
  path: string;
  package: string;
  language: string;
  layer: 'Model' | 'ViewModel' | 'UI Component' | 'Screen' | 'Activity' | 'Config';
  description: string;
  code: string;
}

export const ANDROID_CODE_FILES: CodeFile[] = [
  {
    filename: "UserProfile.kt",
    path: "app/src/main/java/com/example/datingapp/model/UserProfile.kt",
    package: "com.example.datingapp.model",
    language: "kotlin",
    layer: "Model",
    description: "Data class UserProfile đại diện cho dữ liệu hồ sơ cá nhân theo đúng yêu cầu.",
    code: `package com.example.datingapp.model

import androidx.compose.runtime.Immutable

/**
 * Data Model lưu trữ thông tin hồ sơ người dùng
 * @property id Định danh duy nhất của hồ sơ
 * @property name Tên hiển thị
 * @property age Tuổi
 * @property bio Tiểu sử giới thiệu bản thân
 * @property imageUrl Đường dẫn ảnh đại diện (URL)
 * @property distance Khoảng cách địa lý tới vị trí hiện tại
 */
@Immutable
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
    path: "app/src/main/java/com/example/datingapp/viewmodel/DatingViewModel.kt",
    package: "com.example.datingapp.viewmodel",
    language: "kotlin",
    layer: "ViewModel",
    description: "ViewModel quản lý StateFlow danh sách hồ sơ, mock data và các hàm onSwipeLeft / onSwipeRight.",
    code: `package com.example.datingapp.viewmodel

import androidx.lifecycle.ViewModel
import com.example.datingapp.model.UserProfile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * Trạng thái giao diện của màn hình hẹn hò
 */
data class DatingUiState(
    val profiles: List<UserProfile> = emptyList(),
    val lastActionMessage: String? = null
)

/**
 * ViewModel quản lý danh sách hồ sơ và các logic vuốt/chọn
 */
class DatingViewModel : ViewModel() {

    // Danh sách dữ liệu mẫu ban đầu (Mock Data 5 người dùng)
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
     * Bỏ qua hồ sơ hiện tại (Bấm X hoặc quẹt sang trái)
     */
    fun onSwipeLeft() {
        _uiState.update { currentState ->
            val list = currentState.profiles
            if (list.isNotEmpty()) {
                val removed = list.first()
                currentState.copy(
                    profiles = list.drop(1),
                    lastActionMessage = "Đã bỏ qua \${removed.name}"
                )
            } else {
                currentState
            }
        }
    }

    /**
     * Thích hồ sơ hiện tại (Bấm Trái tim hoặc quẹt sang phải)
     */
    fun onSwipeRight() {
        _uiState.update { currentState ->
            val list = currentState.profiles
            if (list.isNotEmpty()) {
                val liked = list.first()
                currentState.copy(
                    profiles = list.drop(1),
                    lastActionMessage = "Đã thích \${liked.name} ❤️"
                )
            } else {
                currentState
            }
        }
    }

    /**
     * Khôi phục/Tải lại danh sách hồ sơ khi hết thẻ
     */
    fun resetProfiles() {
        _uiState.update {
            DatingUiState(
                profiles = initialProfiles,
                lastActionMessage = "Đã làm mới danh sách hồ sơ!"
            )
        }
    }
}`
  },
  {
    filename: "ProfileCard.kt",
    path: "app/src/main/java/com/example/datingapp/ui/components/ProfileCard.kt",
    package: "com.example.datingapp.ui.components",
    language: "kotlin",
    layer: "UI Component",
    description: "Component Thẻ Hồ Sơ: Tải ảnh URL qua Coil, thông tin tên tuổi, khoảng cách, bio đè lên ảnh.",
    code: `package com.example.datingapp.ui.components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.datingapp.model.UserProfile
import kotlinx.coroutines.launch
import kotlin.math.abs

/**
 * Component hiển thị Thẻ Hồ Sơ người dùng: Ảnh tải qua Coil,
 * thông tin tên tuổi, tiểu sử đè lên góc dưới và cử chỉ vuốt quẹt ngón tay.
 */
@Composable
fun ProfileCard(
    profile: UserProfile,
    isTopCard: Boolean,
    onSwipeLeft: () -> Unit,
    onSwipeRight: () -> Unit,
    modifier: Modifier = Modifier
) {
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
                                offsetX.animateTo(1200f, tween(240))
                                onSwipeRight()
                            }
                            offsetX.value < -threshold -> {
                                offsetX.animateTo(-1200f, tween(240))
                                onSwipeLeft()
                            }
                            else -> {
                                offsetX.animateTo(0f, tween(200))
                            }
                        }
                    }
                }
            )
        }
    } else {
        Modifier
    }

    val rotation = (offsetX.value / 60f).coerceIn(-20f, 20f)

    Card(
        shape = RoundedCornerShape(24.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isTopCard) 8.dp else 2.dp),
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
            // Tải ảnh trực tiếp từ URL với thư viện Coil
            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(profile.imageUrl)
                    .crossfade(true)
                    .build(),
                contentDescription = "Ảnh đại diện của \${profile.name}",
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Lớp Gradient làm tối từ giữa xuống đáy để đọc rõ văn bản
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color.Transparent,
                                Color.Black.copy(alpha = 0.25f),
                                Color.Black.copy(alpha = 0.85f)
                            ),
                            startY = 400f
                        )
                    )
            )

            // Nhãn hiển thị tức thời trạng thái Like / Pass khi người dùng kéo thẻ
            if (isTopCard && abs(offsetX.value) > 40f) {
                val isLike = offsetX.value > 0
                Text(
                    text = if (isLike) "THÍCH" else "BỎ QUA",
                    color = if (isLike) Color(0xFF22C55E) else Color(0xFFEF4444),
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Black,
                    modifier = Modifier
                        .align(if (isLike) Alignment.TopStart else Alignment.TopEnd)
                        .padding(24.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color.White.copy(alpha = 0.85f))
                        .padding(horizontal = 14.dp, vertical = 6.dp)
                )
            }

            // Toàn bộ thông tin: Tên, Tuổi, Khoảng cách và Tiểu sử đè lên góc dưới
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
                        contentDescription = "Khoảng cách",
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
}`
  },
  {
    filename: "ActionButtonBar.kt",
    path: "app/src/main/java/com/example/datingapp/ui/components/ActionButtonBar.kt",
    package: "com.example.datingapp.ui.components",
    language: "kotlin",
    layer: "UI Component",
    description: "Component chứa 2 nút hành động: Nút Bỏ qua (X/đỏ) và Nút Thích (Trái tim/hồng).",
    code: `package com.example.datingapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * Component chứa 2 nút hành động chính ở dưới thẻ:
 * - Nút "Bỏ qua" (Hình dấu X / Màu đỏ)
 * - Nút "Thích" (Hình trái tim / Màu hồng nổi bật)
 */
@Composable
fun ActionButtonBar(
    onDislikeClick: () -> Unit,
    onLikeClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Nút Bỏ qua (X / Đỏ)
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
                tint = Color(0xFFEF4444),
                modifier = Modifier.size(36.dp)
            )
        }

        // Nút Thích (Trái tim / Hồng)
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
                tint = Color(0xFFFD297B),
                modifier = Modifier.size(36.dp)
            )
        }
    }
}`
  },
  {
    filename: "DatingScreen.kt",
    path: "app/src/main/java/com/example/datingapp/ui/screens/DatingScreen.kt",
    package: "com.example.datingapp.ui.screens",
    language: "kotlin",
    layer: "Screen",
    description: "Màn hình chính kết nối ProfileCard và ActionButtonBar, xử lý Empty State khi hết thẻ.",
    code: `package com.example.datingapp.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.datingapp.ui.components.ActionButtonBar
import com.example.datingapp.ui.components.ProfileCard
import com.example.datingapp.viewmodel.DatingViewModel

/**
 * Màn hình hẹn hò chính (DatingScreen):
 * Lắp ráp Thẻ Hồ Sơ (ProfileCard) ở giữa và Bộ nút bấm (ActionButtonBar) ở phía dưới.
 * Tự động chuyển sang Empty State khi danh sách không còn hồ sơ nào.
 */
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
                actions = {
                    IconButton(onClick = { viewModel.resetProfiles() }) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Làm mới danh sách"
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
                // Hiển thị khi danh sách đã hết thẻ
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
                    // Khu vực Thẻ Hồ Sơ chính giữa màn hình (Profile Cards Stack)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        // Hiển thị tối đa 2 thẻ để tạo cảm giác chiều sâu 3D
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

                    // 2 nút bấm phía dưới thẻ (Bỏ qua & Thích)
                    ActionButtonBar(
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
 * Giao diện hiển thị thông báo "Không còn hồ sơ nào gần bạn"
 */
@Composable
private fun EmptyProfilesView(
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
                .size(96.dp)
                .clip(CircleShape)
                .background(Color(0xFFFFEDF2)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Favorite,
                contentDescription = null,
                tint = Color(0xFFFD297B),
                modifier = Modifier.size(48.dp)
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
            text = "Bạn đã xem hết các gợi ý hôm nay. Hãy làm mới để khám phá lại từ đầu.",
            fontSize = 14.sp,
            color = Color.Gray,
            textAlign = TextAlign.Center
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
}`
  },
  {
    filename: "MainActivity.kt",
    path: "app/src/main/java/com/example/datingapp/MainActivity.kt",
    package: "com.example.datingapp",
    language: "kotlin",
    layer: "Activity",
    description: "ComponentActivity khởi chạy, gọi setContent gắn kết DatingScreen.",
    code: `package com.example.datingapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.datingapp.ui.screens.DatingScreen

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
}`
  },
  {
    filename: "build.gradle.kts",
    path: "app/build.gradle.kts",
    package: "gradle",
    language: "kotlin",
    layer: "Config",
    description: "Khai báo dependencies: Coil, Material 3, Lifecycle ViewModel Compose.",
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
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    // AndroidX Core & Lifecycle ViewModel
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)

    // Activity Compose
    implementation(libs.androidx.activity.compose)

    // Jetpack Compose & Material 3
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)

    // Thư viện Coil tải ảnh URL cho Jetpack Compose
    implementation(libs.coil.compose)

    debugImplementation(libs.androidx.compose.ui.tooling)
}`
  },
  {
    filename: "AndroidManifest.xml",
    path: "app/src/main/AndroidManifest.xml",
    package: "manifest",
    language: "xml",
    layer: "Config",
    description: "Khai báo quyền truy cập INTERNET để Coil tải ảnh từ mạng.",
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Cấp quyền INTERNET để thư viện Coil tải ảnh từ URL -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Dating App"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.DatingApp">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  }
];
