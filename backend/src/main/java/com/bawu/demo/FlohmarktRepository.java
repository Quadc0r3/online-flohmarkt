package com.bawu.demo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlohmarktRepository extends MongoRepository<Item, String>{
}
