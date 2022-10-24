package com.expense.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.annotation.JsonInclude;

@Document(collection = "user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

	@Id
	private String userName;
	private String firstName;
	private String lastName;
	private String password;
	private double maxExpense;
	@DocumentReference
	private List<Expense> expenses;
	
	
	public User() {
		// TODO Auto-generated constructor stub
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public List<Expense> getExpenses() {
		return expenses;
	}


	public void setExpenses(List<Expense> expenses) {
		this.expenses = expenses;
	}


	public double getMaxExpense() {
		return maxExpense;
	}


	public void setMaxExpense(double maxExpense) {
		this.maxExpense = maxExpense;
	}
	
	
}
