<?php

namespace App\Http\Controllers;

use App\Models\FailedChat;

use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $now = now();
        $failedChats_d = FailedChat::whereDate('created_at', now()->toDateString())->orderBy('id', 'desc')->paginate(5);
        $totaltoday = $failedChats_d->total();

        $failedChats_m = FailedChat::whereMonth('created_at', $now->month)->whereYear('created_at', $now->year);
        $totalmonth = $failedChats_m->count();

        $totalByMonth = [];

        for ($i = 0; $i < 12; $i++) {
            $startDate = $now->copy()->subMonths($i)->startOfMonth();
            $endDate = $now->copy()->subMonths($i)->endOfMonth();

            $total = FailedChat::whereBetween('created_at', [$startDate, $endDate])->count();
            $totalByMonth[$startDate->format('F')] = $total;
        }

        return view('home', ['failedChats' => $failedChats_d, 'totaltoday' => $totaltoday, 'totalmonth' => $totalmonth,'totalByMonth' => $totalByMonth]);
    }
}
