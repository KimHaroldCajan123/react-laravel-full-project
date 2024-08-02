<?php

namespace App\Http\Controllers;
use App\Models\Booking_detail;
use App\Models\Reviews;
use App\Models\Artist;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class ReportsController extends Controller
{

    public function getArtistRevenue(Request $request, $artistId)
    {
        $selectedFilter = $request->input('timeframe');
    
        $query = Booking_detail::join('bookings', 'bookingdetails.booking_id', '=', 'bookings.booking_id')
            ->join('artists', 'bookings.artists_id', '=', 'artists.artists_id')
            ->select('artists.artists_id', 'artists.name', DB::raw('SUM(bookingdetails.amount) as revenue'))
            ->where('bookingdetails.status', '!=', 'cancelled')
            ->where('artists.artists_id', $artistId);
    
        switch ($selectedFilter) {
            case 'day':
                $query->whereDate('bookingdetails.created_at', Carbon::today());
                break;
            case 'week':
                $query->whereBetween('bookingdetails.created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $query->whereMonth('bookingdetails.created_at', Carbon::now()->month);
                break;
            case 'year':
                $query->whereYear('bookingdetails.created_at', Carbon::now()->year);
                break;
            default:
                break;
        }
    
        $revenueData = $query->groupBy('artists.artists_id', 'artists.name')
            ->get();
    
        return response()->json([
            'artistRevenue' => $revenueData,
        ], 200);
    }
    
    
    
    public function filterRevenue($timeframe)
    {
        $revenueData = Booking_detail::selectRaw('DATE(created_at) as date, SUM(amount) as revenue')
            ->where('status', '!=', 'cancelled');

        switch ($timeframe) {
            case 'day':
                $revenueData->whereDate('created_at', Carbon::today());
                break;
            case 'week':
                $revenueData->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $revenueData->whereMonth('created_at', Carbon::now()->month);
                break;
            case 'year':
                $revenueData->whereYear('created_at', Carbon::now()->year);
                break;
            default:
                break;
        }

        $revenueData = $revenueData->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        return response()->json(['revenueData' => $revenueData]);
    }

    public function countStatus(){
        $status = Booking_detail::all();
        $confirmedStatus = $status->where('status', 'confirmed')->count();
        $cancelledStatus = $status->where('status', 'cancelled')->count();

        return response()->json([
            'cancelled'=>$cancelledStatus,
            'confirmed'=>$confirmedStatus,
        ],200);

    }

    public function countRating(){
        $rating = Reviews::all();
        $countRatings1 = $rating->where('ratings', '=' ,'1')->count();
        $countRatings2 = $rating->where('ratings', '=' ,'2')->count();
        $countRatings3 = $rating->where('ratings', '=' ,'3')->count();
        $countRatings4 = $rating->where('ratings', '=' ,'4')->count();
        $countRatings5 = $rating->where('ratings', '=' ,'5')->count();
        
        return response()->json([
            'ratings1'=>$countRatings1,
            'ratings2'=>$countRatings2,
            'ratings3'=> $countRatings3,
            'ratings4' =>$countRatings4,
            'ratings5'=>$countRatings5,
        ],200);
    }
}