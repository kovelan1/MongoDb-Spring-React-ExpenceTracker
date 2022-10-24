package com.expense.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expense.exceptions.ResourceNotFoundException;
import com.expense.model.Expense;
import com.expense.service.ExpenseService;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;
	
	@PostMapping
	public Expense creatExpense(@RequestBody Expense expense) {
		return expenseService.createExpense(expense);
	}
	
	@GetMapping("/{id}")
	public Expense getExpenseById(@PathVariable("id") String id) {
		return expenseService.getExpenseById(id);
	}
	
	@GetMapping("/user/{userId}")
	public List<Expense> getExpenseByUser(@PathVariable("userId") String userId) {
		return expenseService.getExpenseByUser(userId);
	}
	
	@GetMapping("/user/{userId}/category/{categoryId}")
	public List<Expense> getExpenseByUserAndCategory(@PathVariable("userId") String userId,@PathVariable("categoryId") String categoryId) {
		return expenseService.getExpenseByUserAndCategory(userId,categoryId);
	}
	
	@GetMapping("/user/{userId}/date/{startDate}/{endDate}")
	public List<Expense> getExpenseByUserAndCategory(@PathVariable("userId") String userId,@PathVariable("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @PathVariable("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
		return expenseService.getExpenseByUserAndDate(userId, startDate, endDate);
	}
	
	@GetMapping("/user/{userId}/isExcided/{date}")
	public ResponseEntity<?> checkMonthlyExpense(@PathVariable("userId") String userId,@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
		return ResponseEntity.ok("{\"status\" : \""+expenseService.checkLimitExceed(userId,date)+"\"}");
	}
	
	@PutMapping("/{id}")
	public Expense updateExpense(@PathVariable("id") String id,@RequestBody Expense expense) throws ResourceNotFoundException {
		return expenseService.updateExpense(id,expense);
	}
	
	@DeleteMapping("/{id}")
	public Expense deleteExpense(@PathVariable("id") String id) throws ResourceNotFoundException {
		return expenseService.deleteExpense(id);
	}
	
	@GetMapping("/filter/search")
    public Page<Expense> searchPerson(
    		@RequestParam(required = false) String userName,
            @RequestParam(required = false,value = "category") String category,
            @RequestParam(required = false,value = "description") String description,
            @RequestParam(required = false,value = "minPrice") Double minPrice,
            @RequestParam(required = false,value = "maxPrice") Double maxPrice,
            @RequestParam(required = false,value = "startDate")@DateTimeFormat(pattern = "yyyy-MM-dd")  Date startDate,
            @RequestParam(required = false,value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable
                = PageRequest.of(page,size);
        System.out.println(category);
        return expenseService.search(userName,category,description,minPrice,maxPrice,startDate,endDate,pageable);
    }
	
	@GetMapping("/user/{userId}/{date}/percentage-visual")
	public ResponseEntity<?> getPercentageVisualData(@PathVariable("userId") String userId,@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
		return ResponseEntity.ok(expenseService.percentageVisual(userId,date));
	}

}
