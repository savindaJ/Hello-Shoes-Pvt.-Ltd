package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.BranchDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;
import lk.ijse.helloshoespvtapi.repo.BranchRepo;
import lk.ijse.helloshoespvtapi.service.BranchService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Service
public class BranchServiceImpl implements BranchService {

    private final BranchRepo branchRepo;

    private final ModelMapper mapper;

    public BranchServiceImpl(BranchRepo branchRepo, ModelMapper mapper) {
        this.branchRepo = branchRepo;
        this.mapper = mapper;
    }

    @Override
    public boolean saveBranch(BranchDTO branchDTO) {
        branchDTO.setBranchId(IDGenerator.generateBranchId());
        Branch save = branchRepo.save(mapper.map(branchDTO, Branch.class));
        return save != null;
    }

    @Override
    public List<BranchDTO> getAllBranches() {
        return branchRepo.findAll().stream().map(branch -> mapper.map(branch, BranchDTO.class)).toList();
    }

    @Override
    public boolean updateBranch(BranchDTO branchDTO) {
        Branch branch = branchRepo.findById(branchDTO.getBranchId()).orElse(null);
        if (branch != null) {
            branch.setBranchName(branchDTO.getBranchName());
            branch.setBranchContact(branchDTO.getBranchContact());
            branch.setAddress(branchDTO.getAddress());
            branch.setNoOfEmployees(branchDTO.getNoOfEmployees());
            branch.setBranchManager(branchDTO.getBranchManager());
            Branch save = branchRepo.save(branch);
            return save != null;
        }
        return false;
    }
}
