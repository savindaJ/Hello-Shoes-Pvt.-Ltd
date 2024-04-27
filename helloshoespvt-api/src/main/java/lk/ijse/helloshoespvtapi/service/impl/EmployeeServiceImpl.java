package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;
import lk.ijse.helloshoespvtapi.entity.Employee;
import lk.ijse.helloshoespvtapi.entity.User;
import lk.ijse.helloshoespvtapi.enums.Role;
import lk.ijse.helloshoespvtapi.repo.BranchRepo;
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
import org.springframework.transaction.annotation.Transactional;
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

    private final BranchRepo branchRepo;

    public EmployeeServiceImpl(UploadService uploadService, ModelMapper mapper, EmployeeRepo employeeRepo, BranchService branchService, UserRepo userRepo, PasswordEncoder bCryptPasswordEncoder, BranchRepo branchRepo) {
        this.uploadService = uploadService;
        this.mapper = mapper;
        this.employeeRepo = employeeRepo;
        this.branchService = branchService;
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.branchRepo = branchRepo;
    }

    //f5a24919

    //fefe3cc8


    @Transactional
    @Override
    public boolean saveEmployee(EmployeeDTO employee, MultipartFile file) throws IOException {
        String imageId = uploadService.uploadFile(file);
        Branch branch = branchService.getBranchById(employee.getBranchId());
        if (employee.getRole() == Role.ADMIN) {
            branch.setBranchManager(employee.getEmpName());
        }
        branch.setNoOfEmployees(branch.getNoOfEmployees() == null ? 1 : branch.getNoOfEmployees() + 1);
        branchRepo.save(branch);
        if (imageId == null) return false;
        Employee map = mapper.map(employee, Employee.class);
        map.setIsActive(true);
        map.setEmpId(IDGenerator.generateEmployeeId());
        map.setBranch(branch);
        map.setProfilePic(imageId);
        employeeRepo.save(map);

        User user = new User();
        String password = UUID.randomUUID().toString().substring(0, 8);
        System.out.println("password = " + password);
        user.setUsername(employee.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setRole(employee.getRole());
        user.setEmployee(map);
        userRepo.save(user);
        return true;
    }

    @Override
    public List<EmployeeDTO> getAllAdmins() {
        return employeeRepo.findAllByRole(Role.ADMIN).stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public List<EmployeeDTO> getAllCashiers() {
        return employeeRepo.findAllByRole(Role.USER).stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public EmployeeDTO getEmployee(String empId) {
        return mapper.map(employeeRepo.findById(empId).orElseThrow(), EmployeeDTO.class);
    }

    @Override
    public boolean updateEmployee(EmployeeDTO employeeDTO) {
        Employee employee = employeeRepo.findById(employeeDTO.getEmpId()).orElseThrow();
        Branch branch = branchService.getBranchById(employeeDTO.getBranchId());
        employee.setBranch(branch);
        employee.setEmpName(employeeDTO.getEmpName());
        employee.setAddress(employeeDTO.getAddress());
        employee.setContact(employeeDTO.getContact());
        employee.setRole(employeeDTO.getRole());
        employee.setEmergencyInfo(employeeDTO.getEmergencyInfo());
        employee.setEmergencyContact(employeeDTO.getEmergencyContact());
        employee.setDob(employeeDTO.getDob());
        employee.setGender(employeeDTO.getGender());
        employee.setAddress(employeeDTO.getAddress());
        employeeRepo.save(employee);
        return true;
    }
}
