<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QueueStatus;

class QueueStatusController extends Controller
{
    public function show(int $institutionId)
    {
        $status = QueueStatus::where('institution_id', $institutionId)->first();

        if (!$status) {
            return response()->json(['pesan' => 'Status antrean tidak ditemukan'], 404);
        }

        return response()->json(['data' => $status]);
    }

    public function update(Request $request, int $institutionId)
    {
        $validated = $request->validate([
            'sisa_antrean' => ['required', 'integer', 'min:0'],
            'status_kepadatan' => ['required', 'string', 'max:50'],
            'estimasi_waktu_tunggu' => ['required', 'integer', 'min:0'],
        ]);

        $status = QueueStatus::updateOrCreate(
            ['institution_id' => $institutionId],
            $validated
        );

        return response()->json([
            'pesan' => 'Status antrean berhasil diperbarui',
            'data' => $status,
        ]);
    }
}
