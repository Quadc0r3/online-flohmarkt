package com.bawu.demo.controller;


import com.bawu.demo.Item;
import com.bawu.demo.ItemRepository;
import com.bawu.demo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return itemRepository.findAll();
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

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable String id) {
        itemRepository.deleteById(id);
        return "Item " + id + " has been deleted";
    }

    @GetMapping("/userItem/{userId}")
    public List<Item> getUserItems(@PathVariable String userId) {
        System.out.println(userId);
        return itemRepository.findByUserId(userId);
    }
}
