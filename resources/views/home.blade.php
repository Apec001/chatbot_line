@extends('layouts.app')
@section('content')
    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h1>รายชื่อรอการตอบกลับวันนี้ : {{ $totaltoday }}</h1>
                    <hr>
                    <div class="card p-3" style="box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.596);">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Profile</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Time</th>
                                    <th>
                                        <a href="https://chat.line.biz/Uebfcf03f4946038c6d90599f77c20143"
                                            class="btn btn-success" target="_blank">
                                            ไปตอบ
                                        </a>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @if ($failedChats->count() === 0)
                                    <td colspan="4" class="text-center">ไม่มีรายชื่อ</td>
                                @else
                                    @foreach ($failedChats as $data)
                                        <tr>
                                            <td><img src="{{ $data->user_profile }}"
                                                    style="width: 50px; border-radius: 100%;">
                                            </td>

                                            <td>
                                                <pre><h5>{{ $data->user_name }}</h5></pre>
                                            </td>

                                            <td>
                                                <p>{{ $data->created_at }}</p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    @endforeach
                                @endif

                            </tbody>
                        </table>
                        {{ $failedChats->links() }}
                    </div>
                </div>

                <div class="col-6">
                    <div class="card p-3" style="box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.596);">
                        <canvas id="lineChart" style="max-height: 400px;"></canvas>
                        <script>
                            document.addEventListener("DOMContentLoaded", () => {
                                new Chart(document.querySelector('#lineChart'), {
                                    type: 'line',
                                    data: {
                                        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม ', 'เมษายน', 'พฤษภาคม ', 'มิถุนายน', 'กรกฎาคม',
                                            'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
                                        ],
                                        datasets: [{
                                            label: 'จำนวนเข้าถาม 2566',
                                            data: [{{ $totalByMonth['January'] }}, {{ $totalByMonth['February'] }},
                                                {{ $totalByMonth['March'] }}, {{ $totalByMonth['April'] }},
                                                {{ $totalByMonth['May'] }}, {{ $totalByMonth['June'] }},
                                                {{ $totalByMonth['July'] }}, {{ $totalByMonth['August'] }},
                                                {{ $totalByMonth['September'] }}, {{ $totalByMonth['October'] }},
                                                {{ $totalByMonth['November'] }}, {{ $totalByMonth['December'] }}
                                            ],
                                            fill: false,
                                            borderColor: 'rgb(75, 192, 192)',
                                            tension: 0.1
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }
                                });
                            });
                        </script>
                    </div>
                    <br>
                    <div class="col-12">
                        <div class="card p-3" style="box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.596);">
                            <h5>จำนวนเข้าถามเดือนนี้ : {{ $totalmonth }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
