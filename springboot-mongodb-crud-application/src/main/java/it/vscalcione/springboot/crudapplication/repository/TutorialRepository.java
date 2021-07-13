package it.vscalcione.springboot.crudapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.vscalcione.springboot.crudapplication.model.Tutorial;
import it.vscalcione.springboot.crudapplication.model.User;

public interface TutorialRepository extends JpaRepository<Tutorial, String>{
	void deleteUserByTitle(String title);
	Optional<User> findTutorialByTitle(String title);
}