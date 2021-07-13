package it.vscalcione.springboot.crudapplication.repository;

import it.vscalcione.springboot.crudapplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsername(String username);
    List<User> findByEmail(String email);
}


    
