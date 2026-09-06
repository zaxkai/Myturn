<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    // Mengunci nama tabel agar nyambung dengan database dari frontend
    protected $table = 'institutions'; 
    
    // Biar kita bebas melakukan insert data ke kolom mana pun
    protected $guarded = []; 
}