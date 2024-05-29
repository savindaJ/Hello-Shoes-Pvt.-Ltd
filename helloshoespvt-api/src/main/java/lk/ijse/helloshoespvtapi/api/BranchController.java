package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.BranchDTO;
import lk.ijse.helloshoespvtapi.service.BranchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

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
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @PostMapping
    public ResponseEntity<?> saveBranch(@RequestBody BranchDTO branchDTO) {
        try {
            boolean isSaved = branchService.saveBranch(branchDTO);
            logger.info("Branch Saved !");
            return isSaved ? ResponseEntity.ok("Branch Saved !") : ResponseEntity.badRequest().body("Failed to save the branch");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to save the branch");
        }

    }

    @GetMapping
    public ResponseEntity<?> getAllBranches() {
        try {
            List<BranchDTO> allBranches = branchService.getAllBranches();
            logger.info("Branches fetched !");
            return ResponseEntity.ok(allBranches);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the branches");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateBranch(@RequestBody BranchDTO branchDTO) {
        try {
            boolean isUpdated = branchService.updateBranch(branchDTO);
            logger.info("Branch Updated !");
            return isUpdated ? ResponseEntity.ok("Branch Updated !") : ResponseEntity.badRequest().body("Failed to update the branch");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to update the branch");
        }
    }

    @DeleteMapping("/{branchId}")
    public ResponseEntity<?> deleteBranch(@PathVariable("branchId") String branchId) {
        try {
            boolean isDeleted = branchService.deleteBranch(branchId);
            logger.info("Branch Deleted !");
            return isDeleted ? ResponseEntity.ok("Branch Deleted !") : ResponseEntity.badRequest().body("Failed to delete the branch");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to delete the branch");
        }
    }

    @GetMapping("/get/id")
    public ResponseEntity<?> getBranchId() {
        try {
            List<String> branchIds = branchService.getBranchIds();
            logger.info("Branch Id fetched !");
            return ResponseEntity.ok(branchIds);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the branch id");
        }
    }
}
