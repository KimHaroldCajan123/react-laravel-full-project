<?php

namespace App\Http\Controllers;

use App\Models\Tattoo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class TattooController extends Controller
{
    public function index(){
        $tattoo = Tattoo::with('category')->get();
        return response()->json([
            "tattoo"=>$tattoo,
        ],200);
    }

    public function store(Request $request){
        $validate = Validator::make($request->all(),[
            "name"=> "required|string|max:100|unique:tattoos,name",
            "description"=>"required|string|min:10",
            "image"=>"required|image|mimes:jpeg,png,jpg,gif|max:2048",
            "price" =>"required|numeric|min:0",
            'category_id' => 'required|exists:tattoocategory,category_id',
        ]);
        
        if($validate->fails()){
            return response()->json([
                "errors"=> $validate->errors(),
            ],400);
        }else{
            $tattoo = Tattoo::create([
                "name"=> $request->name,
                "description"=> $request->description,
                "image"=> "image.png",
                "price"=> $request->price,
                "category_id"=> $request->category_id,  
            ]);
            if($request->hasFile("image")){
                $image = $request->file("image");
                $extention = $image->getClientOriginalExtension();
                $filename = time().".".$extention;
                $image->move("tattoo/design/", $filename);
                $tattoo->image = "tattoo/design/".$filename;
                $tattoo->save();
             }
             return response()->json([
                "message"=> "Tattoo Created Successfully",
                "success"=>true,
             ],200);
        }
    }

    public function editTattoo($id){
        $tattoo = Tattoo::find($id);
        if ($tattoo) {
            return response()->json([
                "tattoo"=>$tattoo,
            ],200);
        }else{
            return response()->json([
                "error"=>"Tattoo not Found",
            ],404);
        }
    }

    public function updateTattoo(Request $request, $id){
        $validator = Validator::make($request->all(),[
            "name"=>"required|string",
            "description"=>"required|string",
            "price"=> "required|numeric|min:0",
            'category_id' => 'required|exists:tattoocategory,category_id',
            
        ]);
        if($validator->fails()){
            return response()->json([
                "error"=>$validator->errors(),
            ],400);
        }else{
            $tattoo = Tattoo::find($id);
            if ($tattoo) {
               $tattoo->name = $request->name;
               $tattoo->description = $request->description;
               $tattoo->price = $request->price;
               $tattoo->category_id = $request->category_id;

               if($request->hasFile("image")){
                $path = $tattoo->image;
                if(File::exists($path)){
                    File::delete($path);
                }
                $image = $request->file("image");
                $extension = $image->getClientOriginalExtension();
                $filename = time().".".$extension;
                $image->move("tattoo/design/", $filename);
                $tattoo->image = "tattoo/design/".$filename;
               }
               $tattoo->save();
               return response()->json([
                "success"=>true,
                    "message" =>"Updated Successfully",
               ],200);
              }else{
                return response()->json([
                    "message"=>"Not Found Tattoo",
                ],404);
            }
        }
    }

    public function deleteTattoo($id){
        $tattooDelete = Tattoo::find($id);
        $tattooDelete->delete();
        return response()->json([
            'delete'=>'Tattoo Deleted Successfully',
        ],200);
    }
    
}