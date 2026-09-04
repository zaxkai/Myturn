<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\QueueStatus;
use App\Models\Institution;

class TicketController extends Controller
{
    public function checkIn(Request $request)
    {
        // 1. Tangkap data dari frontend (Frontend ngirim instansi_id dan user_id)
        $institutionId = $request->input('instansi_id');
        $userId = $request->input('user_id');

        // 2. Cek apakah instansi dan status antreannya ada
        $instansi = Institution::find($institutionId);
        $queueStatus = QueueStatus::where('institution_id', $institutionId)->first();

        if (!$instansi || !$queueStatus) {
            return response()->json(['pesan' => 'Instansi tidak ditemukan'], 404);
        }

        // 3. Buat Tiket Antrean Baru
        $nomorBaru = 'A-' . rand(100, 999); // Generate nomor acak sementara
        $tiketBaru = Ticket::create([
            'user_id' => $userId,
            'institution_id' => $institutionId, // Mapping instansi_id -> institution_id
            'nomor_antrean' => $nomorBaru,
            'status' => 'menunggu'
        ]);

        // 4. Tambah sisa antrean di tabel queue_status secara otomatis
        $queueStatus->increment('sisa_antrean');

        // 5. Buang data JSON balasan ke frontend
        return response()->json([
            'pesan' => 'Check-in berhasil!',
            'data' => $tiketBaru
        ], 200);
    }
}