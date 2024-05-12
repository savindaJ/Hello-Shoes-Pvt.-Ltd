package lk.ijse.helloshoespvtapi.service.impl;

import jakarta.annotation.PostConstruct;
import lk.ijse.helloshoespvtapi.entity.User;
import lk.ijse.helloshoespvtapi.enums.Role;
import lk.ijse.helloshoespvtapi.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
@Service
@RequiredArgsConstructor
public class InitService {

    private final UserRepo userRepo;

    @PostConstruct
    public void init(){
        if (userRepo.count()==0){
            userRepo.save(new User("savindaJ", "$2a$12$caJE0JZ0FwiBcMnZG8fGU.CRm7gGd7G.c4pVMeefHwGuvQXbNK9u6", Role.SUPER_ADMIN));
        } // 80221474
    }
}
