package com.yogesh.smart_expense_tracker.controller;

import com.yogesh.smart_expense_tracker.model.User;
//import com.yogesh.smart_expense_tracker.repository.ExpenseRepository;
import com.yogesh.smart_expense_tracker.repository.UserRepository;
import com.yogesh.smart_expense_tracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private ExpenseRepository repository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        String token = JwtUtil.generateToken(existingUser.getEmail());

        return ResponseEntity.ok(token);
    }

//    @DeleteMapping("/user/{userId}")
//    public void deleteAll(@PathVariable Long userId) {
//        repository.deleteAll(repository.findByUserId(userId));
//    }
}