package com.bawu.demo.controller;


import com.bawu.demo.Item;
import com.bawu.demo.ItemRepository;
import com.bawu.demo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private ItemRepository itemRepository;

//    @PostMapping
//    public Item createItem(@RequestBody Item item) {
//        return itemRepository.save(item);
//    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findByIsDeletedFalse();
    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable String id) {
        return itemRepository.findById(id).orElse(null);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(item -> item.getCategory() != null ? item.getCategory() : "No Category").distinct()
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable String id, @RequestBody Item item) {
        Item existingItem = itemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setTitle(item.getTitle());
            existingItem.setDescription(item.getDescription());
            existingItem.setPrice(item.getPrice());
            existingItem.setQuantity(item.getQuantity());
            existingItem.setCategory(item.getCategory());
            existingItem.setImageURL(item.getImageURL());
            return ResponseEntity.ok().body(itemRepository.save(existingItem));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<String> sellItem(@PathVariable String id, @RequestBody Item item) {
        Item existingItem = itemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            if (existingItem.getQuantity() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item is sold out");
            }

            existingItem.setQuantity(item.getQuantity() - 1);

            // Delete the Item if all of them are sold
            if (existingItem.getQuantity() <= 0) {
                existingItem.setDeleted(true);
            }
            itemRepository.save(existingItem);
            return ResponseEntity.ok("Item sold");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        //Soft-Delete: only set a flag, so you can easily retrieve the data
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) { // Search: does this Item exist?
            Item item = itemOptional.get();
            item.setDeleted(true);
            itemRepository.save(item);
            return ResponseEntity.ok("Item marked as deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }

    @GetMapping("/userItem/{userId}")
    public List<Item> getUserItems(@PathVariable String userId) {
        return itemRepository.findByUserIdAndIsDeletedFalse(userId);
    }

    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        if (item.getUserId() == null || item.getTitle() == null || item.getPrice() < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        System.out.println("test");
        item.setDeleted(false); // Standardwert für neue Artikel
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }


}
