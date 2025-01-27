package com.bawu.demo;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "items")
public class Item {
    @Id
    private String id;
    private String title;
    private String description;
    private float price;
    private int quantity;
    private String category;
    private String imageURL;
    private String userId;
    private boolean isDeleted = false;
    private LocalDate endDate;


    @CreatedDate
    private LocalDateTime insDate;

    @LastModifiedDate
    private LocalDateTime updDate;

    public Item(String id, String title, String description, float price, int quantity, String category, String imageURL, String userId, LocalDate endDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.imageURL = imageURL;
        this.userId = userId;
        this.endDate = endDate;
    }


    //Getter Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public LocalDateTime getInsDate() {
        return insDate;
    }

    public void setInsDate(LocalDateTime insDate) {
        this.insDate = insDate;
    }

    public LocalDateTime getUpdDate() {
        return updDate;
    }

    public void setUpdDate(LocalDateTime updDate) {
        this.updDate = updDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
