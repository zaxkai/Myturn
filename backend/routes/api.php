<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\QueueStatusController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\BookingController;

// ==========================================
// 1. URL PUBLIK (Bisa diakses tanpa login)
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Fitur Status Live & Check-in Antrean (Tier 1)
Route::get('/institutions/live', [InstitutionController::class, 'liveStatus']);
Route::get('/queue-status/{institutionId}', [QueueStatusController::class, 'show']);
Route::post('/tickets/checkin', [TicketController::class, 'checkIn']);

// ==========================================
// 2. URL PRIVAT (Wajib menyertakan Token Login)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    // Profil & Logout
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Fitur Booking Slot (Fitur Lanjutan)
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
});