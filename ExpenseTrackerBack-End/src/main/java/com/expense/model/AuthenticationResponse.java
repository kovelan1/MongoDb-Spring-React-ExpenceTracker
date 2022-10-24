package com.expense.model;

public class AuthenticationResponse {
	
	private String userName;
	private String firstName;
	private String lastName;
	private double expenseLimit;
	private final String token;

	
	public AuthenticationResponse(String userName, String firstName, String lastName, double expenseLimit,
			String token) {
		super();
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.expenseLimit = expenseLimit;
		this.token = token;
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


	public double getExpenseLimit() {
		return expenseLimit;
	}


	public void setExpenseLimit(double expenseLimit) {
		this.expenseLimit = expenseLimit;
	}


	public String getToken() {
		return token;
	}
	
	
	
	
}
