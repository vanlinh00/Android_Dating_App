package com.example.datingapp.ui.components

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
}
