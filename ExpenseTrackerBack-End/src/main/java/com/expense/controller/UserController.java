package com.expense.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.expense.exceptions.BadRequestException;
import com.expense.exceptions.ResourceNotFoundException;
import com.expense.exceptions.UserExcistException;
import com.expense.model.AuthRequest;
import com.expense.model.User;
import com.expense.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public User signUp(@RequestBody User user) throws UserExcistException {
		return userService.createUser(user);
	}
	
	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable("id") String id) {
		return userService.getUserBuId(id);
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<?> updateUser(@RequestBody User user,@PathVariable("id") String id) throws ResourceNotFoundException{
		return ResponseEntity.ok(userService.updateUser(id,user));
	}
	
	@PostMapping("/authenticate") //error 403
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authenticationRequest ) throws BadRequestException  {
		
		
		return ResponseEntity.ok(userService.getAuthenticated(authenticationRequest));
	}
}
