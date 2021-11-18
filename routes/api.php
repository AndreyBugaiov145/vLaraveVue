<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', 'AuthController@login');
    Route::post('/logout', 'AuthController@logout');
    Route::post('/refresh', 'AuthController@refresh');
    Route::post('/register', 'AuthController@register');

});

Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::post('/me', 'AuthController@me');
    Route::get('getUser', 'AuthController@getUser');
    Route::get('lists', 'TodoController@lists');
    Route::resource('todo','TodoController');
});

Route::get('/todo', function (Request $request) {
    return json_encode(['id' => 'asdsadsad']);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
