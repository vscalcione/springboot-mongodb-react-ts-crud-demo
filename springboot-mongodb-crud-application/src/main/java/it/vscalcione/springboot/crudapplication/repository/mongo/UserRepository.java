package it.vscalcione.springboot.crudapplication.repository.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

import it.vscalcione.springboot.crudapplication.model.mongo.User;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsername(String username);
    List<User> findByEmail(String email);
}


    
