package com.bawu.demo.controller;

import com.bawu.demo.FlohmarktRepository;
import com.bawu.demo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private FlohmarktRepository flohmarktRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return flohmarktRepository.save(item);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return flohmarktRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable String id) {
        return flohmarktRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        Item existingItem = flohmarktRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setTitle(item.getTitle());
            existingItem.setDescription(item.getDescription());
            existingItem.setPrice(item.getPrice());
            existingItem.setQuantity(item.getQuantity());
            return flohmarktRepository.save(existingItem);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable String id) {
        flohmarktRepository.deleteById(id);
        return "Item " + id + " has been deleted";
    }

}
