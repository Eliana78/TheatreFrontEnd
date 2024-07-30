package com.Theatre.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Theatre.enities.Shows;
import com.Theatre.service.ShowService;

@RestController
@RequestMapping("/api")
public class ShowsController {

	
	@Autowired
	ShowService showService;
	
	@GetMapping("/shows")
	@CrossOrigin
	public List<Shows> getAllShows(){
		return showService.getAllShows();
	};
	
	
	@DeleteMapping("/shows/delete/{id}")
	@CrossOrigin
	public void deleteShow(@PathVariable int id) {
		 showService.deleteShow(id);
	};
	
	@PostMapping("/shows/add")
	@CrossOrigin
	public Shows addShow(@RequestBody Shows s) {
		return showService.addShow(s);
	};
	
	
	@GetMapping("/shows/topFirst")
	@CrossOrigin
	public List<Shows> getFirstFourShows(){
		return showService.getFirstFourShows();
	};
	
	@GetMapping("/shows/name/{name}")
	@CrossOrigin
	public List<Shows> getByNamecontaining(@PathVariable String name){
		return showService.getByNamecontaining(name);
	};
	
	
	@GetMapping("/shows/date/{date}")
	@CrossOrigin
	public List<Shows> getByDate(@PathVariable LocalDate date){
		return showService.getByDate(date);
	};
	
	@GetMapping("shows/priceRange/{minPrice}/{maxPrice}")
	@CrossOrigin
	public List<Shows> getByPriceRange (@PathVariable double minPrice,@PathVariable double maxPrice){
		return showService.getByPriceRange(minPrice, maxPrice);
	};
	
	
	
	
}
