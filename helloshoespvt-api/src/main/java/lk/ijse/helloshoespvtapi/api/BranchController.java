package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.BranchDTO;
import lk.ijse.helloshoespvtapi.service.BranchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/branch")
public class BranchController {

    private final BranchService branchService;

    public BranchController(BranchService branchService){
        this.branchService = branchService;
    }

    @PostMapping
    public ResponseEntity<?> saveBranch(@RequestBody BranchDTO branchDTO){
        boolean isSaved = branchService.saveBranch(branchDTO);
        return isSaved ? ResponseEntity.ok("Branch Saved !") : ResponseEntity.badRequest().body("Failed to save the branch");
    }
}
