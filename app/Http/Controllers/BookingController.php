<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Institution;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json(['data' => $bookings]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution_id' => ['required', 'integer', 'exists:institutions,id'],
            'tanggal_kunjungan' => ['required', 'date', 'after_or_equal:today'],
            'waktu_kunjungan' => ['required', 'date_format:H:i'],
        ]);

        $booking = Booking::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'status' => 'menunggu',
        ]);

        return response()->json([
            'pesan' => 'Booking berhasil dibuat',
            'data' => $booking,
        ], 201);
    }

    public function show(Request $request, Booking $booking)
    {
        abort_unless($booking->user_id === $request->user()->id, 403);

        return response()->json(['data' => $booking]);
    }

    public function cancel(Request $request, Booking $booking)
    {
        abort_unless($booking->user_id === $request->user()->id, 403);

        $booking->update(['status' => 'dibatalkan']);

        return response()->json([
            'pesan' => 'Booking berhasil dibatalkan',
            'data' => $booking,
        ]);
    }
}
