package com.yourseason.backend.common.converter;

import com.yourseason.backend.common.exception.NotFoundException;

import javax.persistence.AttributeConverter;

public class BooleanToIntegerConverter implements AttributeConverter<Boolean, Integer> {

    private final String NOT_FOUND_ARGUMENT = "인자가 입력되지 않았습니다.";

    @Override
    public Integer convertToDatabaseColumn(Boolean attribute) {
        if (attribute != null && attribute) {
            return 1;
        } else if (attribute != null && !attribute) {
            return 0;
        }
        throw new NotFoundException(NOT_FOUND_ARGUMENT);
    }

    @Override
    public Boolean convertToEntityAttribute(Integer dbData) {
        if (dbData != null && dbData.intValue() == 1) {
            return true;
        } else if (dbData != null && dbData.intValue() == 0) {
            return false;
        }
        throw new NotFoundException(NOT_FOUND_ARGUMENT);
    }
}
