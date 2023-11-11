package com.example.estudiante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EstudianteApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstudianteApplication.class, args);
	}

}
