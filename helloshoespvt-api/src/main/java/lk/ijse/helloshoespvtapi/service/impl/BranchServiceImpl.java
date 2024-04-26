package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.BranchDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;
import lk.ijse.helloshoespvtapi.repo.BranchRepo;
import lk.ijse.helloshoespvtapi.service.BranchService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
