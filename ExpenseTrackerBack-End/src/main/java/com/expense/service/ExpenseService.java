package com.expense.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.expense.exceptions.BadRequestException;
import com.expense.exceptions.ResourceNotFoundException;
import com.expense.model.Expense;
import com.expense.model.PieVisualResponse;

public interface ExpenseService {

	Expense createExpense(Expense expense);

	Expense getExpenseById(String id);

	List<Expense> getExpenseByUser(String userId);

	List<Expense> getExpenseByUserAndCategory(String userId, String categoryId);
	
	List<Expense> getExpenseByUserAndDate(String userId,Date startDate, Date endDate);

	boolean checkLimitExceed(String userId, Date date);

	Expense updateExpense(String id, Expense expense) throws ResourceNotFoundException;

	Expense deleteExpense(String id) throws ResourceNotFoundException;

	List<PieVisualResponse> percentageVisual(String userId, Date date);

	

	Page<Expense> search(String userName, String category, String description, Double minPrice, Double maxPrice,
			Date startDate, Date endDate, Pageable pageable);

}
