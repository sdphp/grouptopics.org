<?php

namespace Grouptopics\Repositories;

abstract class EloquentRepository
{
    public function getByID($id){
        return $this->model->find($id);
    }

    public function getByUserId($user_id)
    {
        return $this->model->where('user_id', '=', $user_id)->firstOrFail();
    }

    public function getAll()
    {
        return $this->model->all();
    }
}