package com.expense.service;

import com.expense.exceptions.BadRequestException;
import com.expense.exceptions.ResourceNotFoundException;
import com.expense.exceptions.UserExcistException;
import com.expense.model.AuthRequest;
import com.expense.model.AuthenticationResponse;
import com.expense.model.User;

public interface UserService {

	User createUser(User user) throws UserExcistException;

	User getUserBuId(String id);

	User updateUser(String id, User user) throws ResourceNotFoundException;

	AuthenticationResponse getAuthenticated(AuthRequest authenticationRequest) throws BadRequestException;

}
