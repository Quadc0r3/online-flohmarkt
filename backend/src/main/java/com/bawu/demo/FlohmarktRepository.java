package com.bawu.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlohmarktRepository extends MongoRepository<Item, String>{
}
