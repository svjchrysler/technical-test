<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Models\Customer as ModelsCustomer;

class CustomerController extends Controller
{
    public function index()
    {
        return ModelsCustomer::paginate(10);
    }

    public function store(Request $request)
    {
        $article = ModelsCustomer::create($request->all());
        return response()->json($article, 201);
    }

    public function update(Request $request, ModelsCustomer $article)
    {
        $article->update($request->all());
        return response()->json($article, 200);
    }

    public function delete(ModelsCustomer $article)
    {
        $article->delete();
        return response()->json(null, 204);
    }
}
