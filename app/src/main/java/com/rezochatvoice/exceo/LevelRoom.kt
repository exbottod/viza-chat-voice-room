package com.rezochatvoice.exceo

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp

/**
 * Logo level kamar. Aset dari owner ada di res/drawable-xxhdpi
 * dengan nama level_room_1 sampai level_room_55.
 */
private val IKON_LEVEL = intArrayOf(
    R.drawable.level_room_1,
    R.drawable.level_room_2,
    R.drawable.level_room_3,
    R.drawable.level_room_4,
    R.drawable.level_room_5,
    R.drawable.level_room_6,
    R.drawable.level_room_7,
    R.drawable.level_room_8,
    R.drawable.level_room_9,
    R.drawable.level_room_10,
    R.drawable.level_room_11,
    R.drawable.level_room_12,
    R.drawable.level_room_13,
    R.drawable.level_room_14,
    R.drawable.level_room_15,
    R.drawable.level_room_16,
    R.drawable.level_room_17,
    R.drawable.level_room_18,
    R.drawable.level_room_19,
    R.drawable.level_room_20,
    R.drawable.level_room_21,
    R.drawable.level_room_22,
    R.drawable.level_room_23,
    R.drawable.level_room_24,
    R.drawable.level_room_25,
    R.drawable.level_room_26,
    R.drawable.level_room_27,
    R.drawable.level_room_28,
    R.drawable.level_room_29,
    R.drawable.level_room_30,
    R.drawable.level_room_31,
    R.drawable.level_room_32,
    R.drawable.level_room_33,
    R.drawable.level_room_34,
    R.drawable.level_room_35,
    R.drawable.level_room_36,
    R.drawable.level_room_37,
    R.drawable.level_room_38,
    R.drawable.level_room_39,
    R.drawable.level_room_40,
    R.drawable.level_room_41,
    R.drawable.level_room_42,
    R.drawable.level_room_43,
    R.drawable.level_room_44,
    R.drawable.level_room_45,
    R.drawable.level_room_46,
    R.drawable.level_room_47,
    R.drawable.level_room_48,
    R.drawable.level_room_49,
    R.drawable.level_room_50,
    R.drawable.level_room_51,
    R.drawable.level_room_52,
    R.drawable.level_room_53,
    R.drawable.level_room_54,
    R.drawable.level_room_55,
)

/** Jumlah logo level yang tersedia. */
val JUMLAH_IKON_LEVEL: Int get() = IKON_LEVEL.size

/** Tampilkan logo level kamar; level di atas 55 memakai logo terakhir. */
@Composable
fun RoomLevelIcon(level: Int, ukuran: Dp, modifier: Modifier = Modifier) {
    val i = level.coerceIn(1, IKON_LEVEL.size) - 1
    Image(
        painter = painterResource(IKON_LEVEL[i]),
        contentDescription = "Level kamar $level",
        modifier = modifier.size(ukuran),
        contentScale = ContentScale.Fit,
    )
}
