package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;
import lk.ijse.helloshoespvtapi.entity.Employee;
import lk.ijse.helloshoespvtapi.entity.User;
import lk.ijse.helloshoespvtapi.enums.Role;
import lk.ijse.helloshoespvtapi.repo.EmployeeRepo;
import lk.ijse.helloshoespvtapi.repo.UserRepo;
import lk.ijse.helloshoespvtapi.service.BranchService;
import lk.ijse.helloshoespvtapi.service.EmployeeService;
import lk.ijse.helloshoespvtapi.service.UploadService;
import lk.ijse.helloshoespvtapi.service.UserDetailService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final UploadService uploadService;

    private final ModelMapper mapper;

    private final EmployeeRepo employeeRepo;

    private final BranchService branchService;

    private final UserRepo userRepo;

    private final PasswordEncoder bCryptPasswordEncoder;

    public EmployeeServiceImpl(UploadService uploadService, ModelMapper mapper, EmployeeRepo employeeRepo,BranchService branchService,UserRepo userRepo,PasswordEncoder bCryptPasswordEncoder) {
        this.uploadService = uploadService;
        this.mapper = mapper;
        this.employeeRepo = employeeRepo;
        this.branchService = branchService;
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public boolean saveEmployee(EmployeeDTO employee, MultipartFile file) throws IOException {
        String imageId = uploadService.uploadFile(file);
        Branch branch = branchService.getBranchById(employee.getBranchId());
        if (imageId == null) return false;
        String password = UUID.randomUUID().toString().substring(0, 8);
        Employee map = mapper.map(employee, Employee.class);
        map.setIsActive(true);
        map.setEmpId(IDGenerator.generateEmployeeId());
        map.setBranch(branch);
        map.setProfilePic(imageId);
        User user = new User();
        user.setUsername(employee.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setRole(employee.getRole());
        user.setEmployee(map);
        employeeRepo.save(map);
        User save = userRepo.save(user);
        return save != null;
    }

    @Override
    public List<EmployeeDTO> getAllAdmins() {
        return employeeRepo.findAllByRole(Role.ADMIN).stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public List<EmployeeDTO> getAllCashiers() {
        return employeeRepo.findAllByRole(Role.USER).stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }
}
