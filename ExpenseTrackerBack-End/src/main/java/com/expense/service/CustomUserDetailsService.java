package com.expense.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.expense.model.User;
import com.expense.repository.UserRepository;




@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username).get();
        List<SimpleGrantedAuthority> roles=new ArrayList<>();
        roles.add(new SimpleGrantedAuthority("user"));
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),roles);
    }
}