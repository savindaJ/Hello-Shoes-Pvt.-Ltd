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

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @PostMapping
    public ResponseEntity<?> saveBranch(@RequestBody BranchDTO branchDTO) {
        boolean isSaved = branchService.saveBranch(branchDTO);
        return isSaved ? ResponseEntity.ok("Branch Saved !") : ResponseEntity.badRequest().body("Failed to save the branch");
    }

    @GetMapping
    public ResponseEntity<?> getAllBranches() {
        return ResponseEntity.ok(branchService.getAllBranches());
    }

    @PutMapping
    public ResponseEntity<?> updateBranch(@RequestBody BranchDTO branchDTO) {
        boolean isUpdated = branchService.updateBranch(branchDTO);
        return isUpdated ? ResponseEntity.ok("Branch Updated !") : ResponseEntity.badRequest().body("Failed to update the branch");
    }

    @DeleteMapping("/{branchId}")
    public ResponseEntity<?> deleteBranch(@PathVariable("branchId") String branchId) {
        boolean isDeleted = branchService.deleteBranch(branchId);
        return isDeleted ? ResponseEntity.ok("Branch Deleted !") : ResponseEntity.badRequest().body("Failed to delete the branch");
    }
    @GetMapping("/get/id")
    public ResponseEntity<?> getBranchId() {
        return ResponseEntity.ok(branchService.getBranchIds());
    }
}
