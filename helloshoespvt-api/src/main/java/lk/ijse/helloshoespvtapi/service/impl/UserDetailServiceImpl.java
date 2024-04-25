package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.service.UserDetailService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @author : savindaJ
 * @date : 4/25/2024
 * @since : 0.1.0
 **/
@Service
public class UserDetailServiceImpl implements UserDetailService, UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User("foo", "$2a$12$sIXq/95sbL.2sWSmBylGx.BFCUQ/KbRJSnu78T4aYYMEFEMPxsZVi",
                new ArrayList<>());
    }
}
