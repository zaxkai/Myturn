<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Institution;

class InstitutionController extends Controller
{
    // Fungsi untuk membuang data Status Live (Tier 1)
    public function liveStatus()
    {
        // Join tabel institutions dengan queue_status
        // Karena nama kolom sudah disesuaikan dengan frontend, kita langsung select
        $data = Institution::leftJoin('queue_status', 'institutions.id', '=', 'queue_status.institution_id')
            ->select(
                'institutions.id',
                'institutions.nama_instansi',
                'institutions.tipe',
                'institutions.latitude',
                'institutions.longitude',
                'institutions.kapasitas_maksimal',
                'queue_status.sisa_antrean',
                'queue_status.status_kepadatan',
                'queue_status.estimasi_waktu_tunggu'
            )
            ->get();

        // Buang datanya ke Frontend dalam bentuk JSON
        return response()->json([
            'pesan' => 'Berhasil mengambil data live status',
            'data' => $data
        ], 200);
    }
}