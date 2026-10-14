package com.example.datingapp.model

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
)
