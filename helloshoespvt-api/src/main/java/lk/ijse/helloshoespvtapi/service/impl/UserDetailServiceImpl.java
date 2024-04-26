package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.UserDto;
import lk.ijse.helloshoespvtapi.entity.Employee;
import lk.ijse.helloshoespvtapi.entity.User;
import lk.ijse.helloshoespvtapi.enums.Role;
import lk.ijse.helloshoespvtapi.repo.EmployeeRepo;
import lk.ijse.helloshoespvtapi.repo.UserRepo;
import lk.ijse.helloshoespvtapi.service.UserDetailService;
import org.modelmapper.ModelMapper;
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

    private final UserRepo userRepo;

    private final ModelMapper mapper;

    private final EmployeeRepo employeeRepo;

    public UserDetailServiceImpl(UserRepo userRepo, ModelMapper mapper, EmployeeRepo employeeRepo) {
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findById(username).get();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public UserDto loginUser(String userName) {
        User user = userRepo.findById(userName).get();
        if (user.getRole() == Role.SUPER_ADMIN){
            return new UserDto(user.getUsername(),"1ai2SKEeXSLhr0XQbI1vKyV35gUwfvCvZ",user.getRole());
        }
        Employee employee = employeeRepo.findById(user.getEmployee().getEmpId()).get();
        return new UserDto(user.getUsername(),employee.getProfilePic(),user.getRole());
    }
}
