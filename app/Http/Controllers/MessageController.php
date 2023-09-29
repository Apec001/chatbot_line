<?php

namespace App\Http\Controllers;

use App\Models\Message;

use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class MessageController extends Controller
{
    public function message()
    {
        $now = now();
        $message = Message::orderBy('id', 'desc')->paginate(5);
        $message_count = $message->total();

        return view('message', ['message' => $message, 'message_count' => $message_count]);
    }
}
