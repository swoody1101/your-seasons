package com.yourseason.backend.consulting.self.controller.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SelfConsultingFinishRequest {

        private Long selfConsultingId;
        private List<String> bestColorSet;
        private List<String> worstColorSet;
}
