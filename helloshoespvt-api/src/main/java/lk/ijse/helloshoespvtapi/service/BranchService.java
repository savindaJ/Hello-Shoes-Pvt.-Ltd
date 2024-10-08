package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.BranchDTO;
import lk.ijse.helloshoespvtapi.entity.Branch;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
public interface BranchService {
    boolean saveBranch(BranchDTO branchDTO);

    List<BranchDTO> getAllBranches();

    boolean updateBranch(BranchDTO branchDTO);

    boolean deleteBranch(String branchId);

    List<String> getBranchIds();

    Branch getBranchById(String branchId);
}
