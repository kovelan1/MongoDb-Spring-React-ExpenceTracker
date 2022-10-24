package com.expense.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import com.expense.exceptions.ResourceNotFoundException;
import com.expense.model.Expense;
import com.expense.model.PieVisualResponse;
import com.expense.model.User;
import com.expense.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	

	@Override
	public Expense createExpense(Expense expense) {
		
		return expenseRepository.save(expense);
	}

	@Override
	public Expense getExpenseById(String id) {
		return expenseRepository.findById(id).get();
	}

	@Override
	public List<Expense> getExpenseByUser(String userId) {
		
		return expenseRepository.findByUserId(userId);
	}

	@Override
	public List<Expense> getExpenseByUserAndCategory(String userId, String categoryId) {
		
		return expenseRepository.findByCategoryAndUserId(categoryId, userId);
	}

	@Override
	public List<Expense> getExpenseByUserAndDate(String userId,Date startDate, Date endDate) {
		
		return expenseRepository.findByUserIdAndDateBetween( userId, startDate, endDate);
		
		
	}

	private List<Expense> getMonthlyExpenseOfCurrentMonth(String userId,Date currentDate)
	{
		
		Calendar calanderInstance= Calendar.getInstance();
		
		calanderInstance.setTime(currentDate);
		
		int month=calanderInstance.get(Calendar.MONTH)+1;
		int year=calanderInstance.get(Calendar.YEAR);
		
		return expenseRepository.findByuserIdAndMonthYear(userId,month,year);
	}

	@Override
	public boolean checkLimitExceed(String userId, Date date) {
		
		User user=userService.getUserBuId(userId);
		
		List<Expense> excistingExpenses=getMonthlyExpenseOfCurrentMonth(userId,date);
		
		double excistingExpensesAmount= excistingExpenses.stream().map(e-> e.getPrice()).reduce(0.00, Double::sum);
		
		if((excistingExpensesAmount* 0.90 )> user.getMaxExpense() ) {
			return true;
		}else {
			return false;
		}
		
	}

	@Override
	public Expense updateExpense(String id, Expense expense) throws ResourceNotFoundException {
		Expense expenseData = expenseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(" Expense Not Found"));
		
		expenseData.setCategory(expense.getCategory());
		expenseData.setDescription(expense.getDescription());
		expenseData.setDate(expense.getDate());
		expenseData.setPrice(expense.getPrice());
		
		return expenseRepository.save(expenseData);
	}

	@Override
	public Expense deleteExpense(String id) throws ResourceNotFoundException {
		Expense expenseData = expenseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(" Expense Not Found"));
		
		expenseRepository.deleteById(id);
		return expenseData;
	}

	@Override
	public Page<Expense> search(String userName,String category, String description, Double minPrice, Double maxPrice, Date startDate,
			Date endDate, Pageable pageable) {
		Query query = new Query().with(pageable);
        List<Criteria> criteria = new ArrayList<>();
		
        if(userName !=null && !userName.isEmpty()) {
        	
            criteria.add(Criteria.where("user.userName").is(userName));
        }
        
        if(category !=null && !category.isEmpty()) {
            criteria.add(Criteria.where("category").regex(category,"i"));
        }
        
        if(category !=null && !category.isEmpty()) {
            criteria.add(Criteria.where("category").regex(category,"i"));
        }
        
        if(description !=null && !description.isEmpty()) {
            criteria.add(Criteria.where("description").regex(description,"i"));
        }

//        if( maxPrice != 0.00) {
//            criteria.add(Criteria.where("age").gte(minPrice).lte(maxPrice));
//        }
        
        if( startDate != null && endDate != null) {
            criteria.add(Criteria.where("date").gte(startDate).lte(endDate));
        }
        
        if(!criteria.isEmpty()) {
            query.addCriteria(new Criteria()
                    .andOperator(criteria.toArray(new Criteria[0])));
        }
        
        Page<Expense> expenses = PageableExecutionUtils.getPage(
                mongoTemplate.find(query, Expense.class
                ), pageable, () -> mongoTemplate.count(query.skip(0).limit(0),Expense.class));
        
        return expenses;
	}

	@Override
	public List<PieVisualResponse> percentageVisual(String userId, Date date) {
		List<PieVisualResponse> response=new ArrayList<PieVisualResponse>();
		
		List<Expense> monthlyExpenses=getMonthlyExpenseOfCurrentMonth(userId,date);
		
		
		Map<String, Double> percentageMap=monthlyExpenses.stream().collect(Collectors.groupingBy(Expense::getCategory,Collectors.summingDouble(Expense::getPrice)));
		
//		double totalExp=monthlyExpenses.stream().map(e-> e.getPrice()).reduce(0.00, Double::sum);
//		
		percentageMap.forEach((k,v)->{
			response.add(new PieVisualResponse(k, v));

		});
		
		
		return response;
	}
}
