<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artist;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class ArtistController extends Controller
{
 
    public function storeArtist(Request $request){
        $validate = Validator::make($request->all(),[
            "name"=> "required|string|unique:artists,name",
            "image"=>"required|image|mimes:jpeg,png,jpg,gif|max:2048",
            "hourly_rate"=>"required|numeric|min:0",
            "availability"=>"required|string|max:200",
            "biography"=>"required|string",
            "experience"=>"required|string",
            "contact_info"=>"required|string",
            "type"=>"required",
        ]);
        if($validate->fails()){
            return response()->json([
                "errors"=> $validate->errors(),
            ],400);
        }else{

           $artist = Artist::create([
            "name"=> $request->name,
            "hourly_rate"=>$request->hourly_rate,
            "availability"=>$request->availability,
            "biography"=>$request->biography,
            "experience"=>$request->experience,
            "contact_info"=>$request->contact_info,
            "type"=>$request->type,
          ]);
          
          if($request->hasFile("image")){
            $image = $request->file("image");
            $extention = $image->getClientOriginalExtension();
            $filename = time().".".$extention;
            $image->move("images/uploads/", $filename);
            $artist->image = "images/uploads/".$filename;
            $artist->save();
          }
          
          return response()->json([
            "success"=>true,
            "message" =>"Artist Successfully Created",
          ],200);
        }
    }


    public function index(){
        $artist = Artist::all();
        return response()->json([
            'artist'=>$artist,
        ],200);
    }

    public function editArtist($id)
    {
        $artist = Artist::find($id);
        if ($artist) {
            return response()->json([
                'artist' => $artist,
            ], 200);
        } else {
            return response()->json([
                'message' => "Artist Not Found",
            ], 404);
        }
    }
    
    public function updateArtist(Request $request, $id){
        $validate = Validator::make($request->all(),[
            "name"=>"required|string",
            "hourly_rate"=>"required|numeric|min:0",
            "availability"=>"required|string|max:200",
            "biography"=>"required|string",
            "experience"=>"required|string",
            "contact_info"=>"required|string",
            "type"=>"required",
        ]);
    
        if($validate->fails()){
            return response()->json([
                "errors"=> $validate->errors(),
            ],400);
        } else {
            $artist = Artist::find($id);
    
            if ($artist) {
                $artist->name = $request->name;
                $artist->hourly_rate = $request->hourly_rate;
                $artist->availability = $request->availability;
                $artist->biography = $request->biography;
                $artist->experience = $request->experience;
                $artist->contact_info = $request->contact_info;
                $artist->type = $request->type;
                
                if($request->hasFile("image")){
                    $path = $artist->image;
                    if(File::exists($path)){
                        File::delete($path);
                    }
                    $image = $request->file("image");
                    $extension = $image->getClientOriginalExtension();
                    $filename = time().".".$extension;
                    $image->move("images/uploads/", $filename);
                    $artist->image = "images/uploads/".$filename;
                }
                
                $artist->save();
                
                return response()->json([
                    "success"=>true,
                    "message" =>"Updated Successfully",
                ],200);
            } else {
                return response()->json([
                    "message"=> "Artist Not Found",
                ],404);
            }
        }
    }   

    public function destroy($id){
        $delete = Artist::find($id);
        $delete->delete();
        
        return response()->json([
          "message"=>"deleted successfully",
        ],200);
    }
}