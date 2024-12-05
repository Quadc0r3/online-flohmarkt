package com.bawu.demo.controller;


import com.bawu.demo.Item;
import com.bawu.demo.ItemRepository;
import com.bawu.demo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

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
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        Item existingItem = itemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setTitle(item.getTitle());
            existingItem.setDescription(item.getDescription());
            existingItem.setPrice(item.getPrice());
            existingItem.setQuantity(item.getQuantity());
            existingItem.setCategory(item.getCategory());
            existingItem.setImageURL(item.getImageURL());
            return itemRepository.save(existingItem);
        }
        return null;
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        //Soft-Delete: um im Notfall die Daten wieder zurück zu bekommen
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) { //Schaue: Gibt es das Item überhaupt?
            Item item = itemOptional.get();
            item.setDeleted(true);
            itemRepository.save(item);
            return ResponseEntity.ok("Item marked as deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Eyetem not found");
    }


    @GetMapping("/userItem/{userId}")
    public List<Item> getUserItems(@PathVariable String userId) {
        return itemRepository.findByUserIdAndIsDeletedFalse(userId);
    }
}
