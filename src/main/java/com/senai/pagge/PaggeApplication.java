package com.senai.pagge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.senai.pagge.entities")
public class PaggeApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaggeApplication.class, args);
	}

}
