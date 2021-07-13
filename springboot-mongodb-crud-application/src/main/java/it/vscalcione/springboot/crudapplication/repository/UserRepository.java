package it.vscalcione.springboot.crudapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.vscalcione.springboot.crudapplication.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	void deleteUserById(Long id);
	Optional<User> findUserById(Long id);
	
}
