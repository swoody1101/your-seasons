package com.yourseason.backend.common.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ToneRepository extends JpaRepository<Tone, Long> {

    Optional<Tone> findByName(String name);
}
