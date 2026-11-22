package com.rezochatvoice.exceo

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.util.Log
import com.unity3d.ads.IUnityAdsInitializationListener
import com.unity3d.ads.IUnityAdsLoadListener
import com.unity3d.ads.IUnityAdsShowListener
import com.unity3d.ads.UnityAds
import com.unity3d.ads.UnityAdsShowOptions

/**
 * Iklan berhadiah Unity Ads untuk menu coin gratis.
 *
 * Alur: siapkan sekali dengan Game ID dari server, muat placement Rewarded,
 * lalu tampilkan saat user menekan tombol. Coin baru diminta ke server ketika
 * Unity melaporkan COMPLETED (iklan ditonton sampai habis). Kalau user menutup
 * iklan lebih awal, state-nya SKIPPED dan hadiah tidak diberikan.
 *
 * Game ID dan Placement ID dibaca dari server (op iklan_info), jadi keduanya
 * bisa diganti di panel tanpa build APK baru.
 */
object IklanUnity {
    private const val TAG = "IklanUnity"

    private var gameIdTerpasang = ""
    private var sedangSiap = false
    private val tungguSiap = mutableListOf<() -> Unit>()
    private val siapMuat = mutableSetOf<String>()

    fun findActivity(c: Context?): Activity? {
        var x = c
        while (x is ContextWrapper) {
            if (x is Activity) return x
            x = x.baseContext
        }
        return null
    }

    private fun siapkan(ctx: Context, gameId: String, lanjut: () -> Unit) {
        if (gameId.isBlank()) return
        if (UnityAds.isInitialized() && gameIdTerpasang == gameId) {
            lanjut()
            return
        }
        tungguSiap.add(lanjut)
        if (sedangSiap && gameIdTerpasang == gameId) return
        gameIdTerpasang = gameId
        sedangSiap = true
        UnityAds.initialize(ctx.applicationContext, gameId, false, object : IUnityAdsInitializationListener {
            override fun onInitializationComplete() {
                sedangSiap = false
                val daftar = tungguSiap.toList()
                tungguSiap.clear()
                daftar.forEach { runCatching { it() } }
            }

            override fun onInitializationFailed(error: UnityAds.UnityAdsInitializationError?, message: String?) {
                sedangSiap = false
                val daftar = tungguSiap.toList()
                tungguSiap.clear()
                Log.w(TAG, "init gagal: " + error + " " + message)
                daftar.forEach { runCatching { it() } }
            }
        })
    }

    /** Muat iklan lebih awal supaya tombol langsung jalan. */
    fun siapkanAwal(ctx: Context, gameId: String, placement: String) {
        if (gameId.isBlank() || placement.isBlank()) return
        siapkan(ctx, gameId) { muat(ctx, placement) }
    }

    private fun muat(ctx: Context, placement: String) {
        if (!UnityAds.isInitialized() || siapMuat.contains(placement)) return
        siapMuat.add(placement)
        UnityAds.load(placement, object : IUnityAdsLoadListener {
            override fun onUnityAdsAdLoaded(p: String) {
                siapMuat.add(p)
            }

            override fun onUnityAdsFailedToLoad(p: String, error: UnityAds.UnityAdsLoadError?, message: String?) {
                siapMuat.remove(p)
                Log.w(TAG, "muat gagal " + p + ": " + error + " " + message)
            }
        })
    }

    fun tampil(
        activity: Activity,
        gameId: String,
        placement: String,
        onHadiah: () -> Unit,
        onGagal: (String) -> Unit,
    ) {
        if (gameId.isBlank() || placement.isBlank()) {
            onGagal("ID iklan belum diatur di panel")
            return
        }
        siapkan(activity, gameId) {
            if (!UnityAds.isInitialized()) {
                onGagal("Iklan belum siap, coba lagi sebentar")
                return@siapkan
            }
            siapMuat.remove(placement)
            UnityAds.load(placement, object : IUnityAdsLoadListener {
                override fun onUnityAdsAdLoaded(p: String) {
                    UnityAds.show(activity, p, UnityAdsShowOptions(), object : IUnityAdsShowListener {
                        override fun onUnityAdsShowFailure(
                            q: String,
                            error: UnityAds.UnityAdsShowError?,
                            message: String?,
                        ) {
                            onGagal("Iklan gagal tampil: " + (message ?: error?.name ?: "coba lagi"))
                            muat(activity, q)
                        }

                        override fun onUnityAdsShowStart(q: String) {}

                        override fun onUnityAdsShowClick(q: String) {}

                        override fun onUnityAdsShowComplete(
                            q: String,
                            state: UnityAds.UnityAdsShowCompletionState?,
                        ) {
                            siapMuat.remove(q)
                            if (state == UnityAds.UnityAdsShowCompletionState.COMPLETED) onHadiah()
                            else onGagal("Iklan belum selesai ditonton")
                            muat(activity, q)
                        }
                    })
                }

                override fun onUnityAdsFailedToLoad(p: String, error: UnityAds.UnityAdsLoadError?, message: String?) {
                    onGagal("Belum ada iklan tersedia sekarang" + if (message.isNullOrBlank()) "" else ": " + message)
                }
            })
        }
    }
}
