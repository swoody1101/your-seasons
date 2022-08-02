package com.yourseason.backend.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "tone_id"))
@Entity
public class Tone extends BaseTimeEntity {

    @NotNull
    private String name;

    @OneToMany(mappedBy = "tone")
    private List<Color> colors = new ArrayList<>();

    @Builder
    public Tone(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, String name, List<Color> colors) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.name = name;
        this.colors = colors;
    }
}
