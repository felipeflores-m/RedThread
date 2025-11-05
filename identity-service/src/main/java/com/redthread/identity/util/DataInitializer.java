package com.redthread.identity.util;

import com.redthread.identity.model.Role;
import com.redthread.identity.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roles;

    public DataInitializer(RoleRepository roles) { this.roles = roles; }

    @Override
    public void run(String... args) {
        ensure("CLIENTE", "Cliente");
        ensure("VENDEDOR", "Vendedor");
        ensure("REPARTIDOR", "Repartidor");
        ensure("ADMIN", "Administrador");
    }

    private void ensure(String key, String name) {
        roles.findByKey(key).orElseGet(() -> {
            Role r = new Role();
            r.setKey(key); r.setName(name);
            return roles.save(r);
        });
    }
}
