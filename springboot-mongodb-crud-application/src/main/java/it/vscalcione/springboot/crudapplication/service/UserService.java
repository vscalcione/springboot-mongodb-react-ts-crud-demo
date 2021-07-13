package it.vscalcione.springboot.crudapplication.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.vscalcione.springboot.crudapplication.model.User;

@Service
public interface UserService {
	
	User addUser(User user);
	List<User> findAllUsers();
	User updateUser(User user);
	User findUserById(Long id);
	User findUserByUsername(String username);
	void deleteEmployee(Long id);

}
