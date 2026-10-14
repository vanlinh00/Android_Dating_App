package com.example.datingapp.ui.components

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
}
