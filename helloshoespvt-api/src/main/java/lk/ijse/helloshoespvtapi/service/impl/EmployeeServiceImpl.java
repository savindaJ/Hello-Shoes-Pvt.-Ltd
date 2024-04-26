package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;
import lk.ijse.helloshoespvtapi.entity.Employee;
import lk.ijse.helloshoespvtapi.repo.EmployeeRepo;
import lk.ijse.helloshoespvtapi.service.BranchService;
import lk.ijse.helloshoespvtapi.service.EmployeeService;
import lk.ijse.helloshoespvtapi.service.UploadService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    public EmployeeServiceImpl(UploadService uploadService, ModelMapper mapper, EmployeeRepo employeeRepo,BranchService branchService) {
        this.uploadService = uploadService;
        this.mapper = mapper;
        this.employeeRepo = employeeRepo;
        this.branchService = branchService;
    }

    @Override
    public boolean saveEmployee(EmployeeDTO employee, MultipartFile file) throws IOException {
        String imageId = uploadService.uploadFile(file);
        Branch branch = branchService.getBranchById(employee.getBranchId());
        System.out.println(branch+" "+employee.getBranchId());
        System.out.println(imageId);
        if (imageId == null) return false;
        Employee map = mapper.map(employee, Employee.class);
        map.setIsActive(true);
        map.setEmpId(IDGenerator.generateEmployeeId());
        map.setBranch(branch);
        map.setProfilePic(imageId);
        return employeeRepo.save(map) != null;
    }
}
