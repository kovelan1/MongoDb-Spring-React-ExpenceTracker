package com.expense.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.expense.exceptions.BadRequestException;
import com.expense.exceptions.ResourceNotFoundException;
import com.expense.exceptions.UserExcistException;
import com.expense.model.AuthRequest;
import com.expense.model.AuthenticationResponse;
import com.expense.model.User;
import com.expense.repository.UserRepository;
import com.expense.util.JwtUtil;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User createUser(User user) throws UserExcistException {
		Optional<User> userData = userRepository.findById(user.getUserName());
		
		if(userData.isPresent()) {
			throw new UserExcistException("User Name Already Excist");
		}
		String password=user.getPassword();
		String encodePass=encoder.encode(password);
		user.setPassword(encodePass);
		return userRepository.save(user);
	}
	
	@Override
	public User getUserBuId(String id) {
		
		return userRepository.findById(id).get();
	}

	@Override
	public User updateUser(String id, User user) throws ResourceNotFoundException {
		User userData = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
		
		userData.setFirstName(user.getFirstName());
		userData.setLastName(user.getLastName());
		userData.setMaxExpense(user.getMaxExpense());
		
		return userRepository.save(userData);
	}

	@Override
	public AuthenticationResponse getAuthenticated(AuthRequest authenticationRequest) throws BadRequestException {
		
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword())
			);
		} catch (BadCredentialsException e) {
			throw new BadRequestException("Incorrect user name or password");
		}
		User user=getUserBuId(authenticationRequest.getUserName());
		final String token= jwtUtil.generateToken(authenticationRequest.getUserName());
		final Date expireDate=jwtUtil.extractExpiration(token);
		System.out.println(expireDate.toString());
		return new AuthenticationResponse(user.getUserName(), user.getFirstName(), user.getLastName(),user.getMaxExpense(), token);
	}

}
