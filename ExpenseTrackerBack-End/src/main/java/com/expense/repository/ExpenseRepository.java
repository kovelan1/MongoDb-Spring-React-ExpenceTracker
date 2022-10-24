package com.expense.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.expense.model.Expense;

import java.util.Date;
import java.util.List;
import java.lang.String;

@Repository
public interface ExpenseRepository extends  MongoRepository<Expense, String>{

	@Query("{'user.userName': ?0}")
	List<Expense> findByUserId(String _id);
	
	@Query("{'category': ?0, 'user.userName': ?1 }")
	List<Expense> findByCategoryAndUserId(String category,String _id);
	
	@Query("{'date' : { $gte: ?1, $lte: ?2 },'user.userName': ?0 }")
	List<Expense> findByUserIdAndDateBetween(String userId, Date startDate, Date endDate);

	@Query("{ '$and': [ {'$expr': { '$eq': [{ '$month': '$date' }, ?1] }},{'$expr': { '$eq': [{ '$year': '$date' }, ?2] }}],'user.userName': ?0  }")
	List<Expense> findByuserIdAndMonthYear(String userId, int month, int year);
}
