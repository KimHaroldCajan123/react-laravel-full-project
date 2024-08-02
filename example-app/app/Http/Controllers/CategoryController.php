<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
class CategoryController extends Controller
{
    public function index(){
        $category = Category::all();
        return Response()->json([
            "category"=> $category,
        ],200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            "categoryname"=> "required|string|max:100|unique:tattoocategory,categoryname",
        ]);
        if($validator->fails()){
            return response()->json([
                "error" =>$validator->errors(),
            ],400);
        }else{
            $category = Category::create([
                "categoryname"=> $request->categoryname,
            ]);
            $category->save();
            
            return response()->json([
                "data"=> $category,
                'message'=> "Category Created Successfully",
            ],200);
        }
        
    }
    public function editCategory($id){
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                "error"=> "category not found",
            ],404);
        }else{
            return response()->json([
                "category"=>$category,
            ],200);
        }
    }
     public function updateCategory(Request $request ,$id){
        $validator = Validator::make($request->all(),[
            "categoryname"=> "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors(),
            ],400);
        }else{
            $category = Category::find($id);
            if (!$category) {
                return response()->json([
                   "erorr"=> "category not found",
                ],404);
            }
            $category->categoryname= $request->categoryname; 
            $category->update();
            return response()->json([
                'update'=> "updated success",
            ],200);
        }
     }
     public function deleteCategory($id){
        $delete = Category::find($id);
        $delete->delete();
        return response()->json([
            'delete'=> 'Deleted Successfully',
        ],200);
     }
} 