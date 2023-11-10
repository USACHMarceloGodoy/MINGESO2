package com.example.Cuota;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class CuotaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CuotaApplication.class, args);
	}

}
