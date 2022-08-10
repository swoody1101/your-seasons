package com.yourseason.backend.util;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class RedisUtil {

    private final StringRedisTemplate redisTemplate;
    private ValueOperations<String, String> valueOperations;

    public String getData(String key) {
        valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setDataExpire(String key, String value, long duration) {
        valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public boolean validateData(String key, String value) {
        if (getData(key).equals(value)) {
            return true;
        }
        return false;
    }
}
