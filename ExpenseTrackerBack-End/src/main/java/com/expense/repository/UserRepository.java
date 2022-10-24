package com.expense.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.expense.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{

}
