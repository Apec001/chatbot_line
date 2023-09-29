@extends('layouts.app')
@section('content')
<br><br>
    <div class="container">
        <h1>ข้อความทั้งหมด</h1>
        <hr>
        <div class="card p-3" style="box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.596);">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">Message</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($message->count() === 0)
                        <td colspan="4" class="text-center">ไม่มีรายชื่อ</td>
                    @else
                        @foreach ($message as $data)
                            <tr>
                                <td><img src="{{ $data->profile }}" style="width: 50px; border-radius: 100%;">
                                </td>

                                <td>
                                    <pre><h5>{{ $data->message }}</h5></pre>
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
            {{ $message->links() }}
        </div>
    </div>
@endsection
