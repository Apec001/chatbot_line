<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FailedChat extends Model
{
    use HasFactory;

    // สร้างเมธอดเพื่อดึงข้อมูลทั้งหมดจากตาราง failed_chat
    public static function getAllData()
    {
        return FailedChat::all();
    }
}