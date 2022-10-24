
package com.expense.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;


@ControllerAdvice
public class GlobalExceptionHandler {

  
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<?> resourceNotFoundException(
      ResourceNotFoundException ex, WebRequest request) {
    ErrorResponse errorDetails =
        new ErrorResponse(new Date(), HttpStatus.NOT_FOUND.toString(), ex.getMessage(), request.getDescription(false));
    return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
  }
  
  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<?> badRequestException(
		  BadRequestException ex, WebRequest request) {
    ErrorResponse errorDetails =
        new ErrorResponse(new Date(), HttpStatus.BAD_REQUEST.toString(), ex.getMessage(), request.getDescription(false));
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
  }
  
  @ExceptionHandler(UserExcistException.class)
  public ResponseEntity<?> userExcistException(
		  UserExcistException ex, WebRequest request) {
    ErrorResponse errorDetails =
        new ErrorResponse(new Date(), HttpStatus.BAD_REQUEST.toString(), ex.getMessage(), request.getDescription(false));
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
  }

  
//  @ExceptionHandler(BadRequestException.class)
//  public ResponseEntity<?> badCredientialsException(
//		  BadRequestException ex, WebRequest request) {
//    ErrorResponse errorDetails =
//        new ErrorResponse(new Date(), HttpStatus.BAD_REQUEST.toString(), ex.getMessage(), request.getDescription(false));
//    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//  }
  
  @ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handIllegalArgumentException(IllegalArgumentException exception){
		return new ResponseEntity<Exception>(new Exception("Invalid update action"),HttpStatus.BAD_REQUEST);
	}
  
}
