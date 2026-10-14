package com.example.datingapp.ui.screens

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
}
