package com.catalogue.product.config;
import com.netflix.discovery.shared.transport.jersey3.Jersey3TransportClientFactories;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class EurekaClientConfig {
    @Bean
    public Jersey3TransportClientFactories jersey3TransportClientFactories() {
        return Jersey3TransportClientFactories.getInstance();
    }
}