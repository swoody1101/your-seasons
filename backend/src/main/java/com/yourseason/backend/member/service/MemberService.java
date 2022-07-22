package com.yourseason.backend.member.service;

import com.yourseason.backend.member.domain.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.domain.customer.domain.CustomerRepository;
import com.yourseason.backend.member.exception.DuplicateEmailException;
import com.yourseason.backend.member.exception.DuplicateNicknameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final CustomerRepository customerRepository;
    private final ConsultantRepository consultantRepository;

    public boolean validateEmail(String email) {
        if (customerRepository.existsByEmail(email) || consultantRepository.existsByEmail(email)) {
            return true;
//            throw new DuplicateEmailException();
        }
        return false;
    }

    public boolean validateNickname(String nickname) {
        if (customerRepository.existsByNickname(nickname) || consultantRepository.existsByNickname(nickname)) {
            return true;
//            throw new DuplicateNicknameException();
        }
        return false;
    }
}
