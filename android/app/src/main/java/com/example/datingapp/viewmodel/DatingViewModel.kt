package com.example.datingapp.viewmodel

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

    // Danh sách dữ liệu mẫu ban đầu (Mock Data)
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
}
