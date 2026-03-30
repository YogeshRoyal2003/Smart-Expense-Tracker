package com.yogesh.smart_expense_tracker.controller;

import com.yogesh.smart_expense_tracker.model.User;
//import com.yogesh.smart_expense_tracker.repository.ExpenseRepository;
import com.yogesh.smart_expense_tracker.repository.UserRepository;
import com.yogesh.smart_expense_tracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private ExpenseRepository repository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!existingUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return JwtUtil.generateToken(existingUser.getEmail());
    }

//    @DeleteMapping("/user/{userId}")
//    public void deleteAll(@PathVariable Long userId) {
//        repository.deleteAll(repository.findByUserId(userId));
//    }
}