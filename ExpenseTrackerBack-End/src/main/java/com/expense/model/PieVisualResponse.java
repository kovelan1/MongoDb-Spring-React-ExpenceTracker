package com.expense.model;

public class PieVisualResponse {

	private String category;
	private double sum;
	
	public PieVisualResponse() {
		// TODO Auto-generated constructor stub
	}
	
	

	public PieVisualResponse(String category, double sum) {
		
		this.category = category;
		this.sum = sum;
	}



	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}
	
	
}
