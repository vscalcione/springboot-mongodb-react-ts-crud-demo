package it.vscalcione.springboot.crudapplication.repository.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

import it.vscalcione.springboot.crudapplication.model.mongo.Tutorial;

import java.util.List;

public interface TutorialRepository extends MongoRepository<Tutorial, String> {

    List<Tutorial> findByTitleContaining(String title);
    List<Tutorial> findByPublished(boolean published);
}
