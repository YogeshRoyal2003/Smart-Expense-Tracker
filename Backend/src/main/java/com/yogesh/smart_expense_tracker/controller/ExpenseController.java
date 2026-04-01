package com.yogesh.smart_expense_tracker.controller;

import com.yogesh.smart_expense_tracker.model.Expense;
import com.yogesh.smart_expense_tracker.repository.ExpenseRepository;
import com.yogesh.smart_expense_tracker.security.JwtUtil;
import com.yogesh.smart_expense_tracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.yogesh.smart_expense_tracker.model.User;
import com.yogesh.smart_expense_tracker.repository.UserRepository;
//import com.yogesh.smart_expense_tracker.util.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
//@CrossOrigin
@CrossOrigin(origins = "*")
public class ExpenseController {
    @Autowired
    private ExpenseService service;

    @Autowired
    private ExpenseRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    //    @GetMapping
//    public List<Expense> getAllExpenses() {
//        return service.getAllExpenses();
//    }
    @GetMapping
    public List<Expense> getExpenses(@RequestHeader("Authorization") String header) {

        String email = getEmailFromToken(header);
        User user = userRepository.findByEmail(email).orElseThrow();

        return repository.findByUserId(user.getId());
    }

//    @PostMapping
//    public Expense addExpense(@RequestBody Expense expense) {
//        return service.saveExpense(expense);
//    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense,
                              @RequestHeader("Authorization") String header) {

        String email = getEmailFromToken(header);
        User user = userRepository.findByEmail(email).orElseThrow();

        expense.setUser(user);

        return repository.save(expense);
    }

    @DeleteMapping("/all")
    public void deleteAll(@RequestHeader("Authorization") String header) {
        String email = getEmailFromToken(header);
        User user = userRepository.findByEmail(email).orElseThrow();
        repository.deleteByUserId(user.getId());
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return service.updateExpense(id, expense);
    }

    @GetMapping("/category/{category}")
    public List<Expense> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    @GetMapping("/monthly")
    public Double getMonthlyTotal(@RequestParam int year,
                                  @RequestParam int month) {
        return service.getMonthlyTotal(year, month);
    }

    @GetMapping("/user/{userId}")
    public List<Expense> getUserExpenses(@PathVariable Long userId) {
        return service.getUserExpenses(userId);
    }

//    @DeleteMapping("/deleteAll")
//    public void deleteAll() {
//        service.deleteAll();
//    }

    @DeleteMapping("/user/{userId}")
    public void deleteByUser(@PathVariable Long userId) {
        service.deleteByUserId(userId);
    }

    private String getEmailFromToken(String header) {
        String token = header.substring(7);
        return JwtUtil.extractEmail(token);
    }
}
