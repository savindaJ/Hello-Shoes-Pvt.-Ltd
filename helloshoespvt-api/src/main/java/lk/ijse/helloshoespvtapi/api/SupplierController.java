package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.SupplierDTO;
import lk.ijse.helloshoespvtapi.service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private final SupplierService supplierService;
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public ResponseEntity<?> saveSupplier(@RequestBody SupplierDTO supplierDTO) {
        try {
            boolean isSave = supplierService.saveSupplier(supplierDTO);
            logger.info("Supplier Saved !");
            return isSave ? ResponseEntity.ok("Supplier Saved !") : ResponseEntity.badRequest().body("Failed to save the supplier");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to save the supplier");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSuppliers() {
        try {
            List<SupplierDTO> allSuppliers = supplierService.getAllSuppliers();
            logger.info("All Suppliers Fetched !");
            return ResponseEntity.ok(allSuppliers);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the suppliers");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplier(@PathVariable("id") String id) {
        try {
            SupplierDTO supplier = supplierService.getSupplier(id);
            logger.info("Supplier Fetched !");
            return ResponseEntity.ok(supplier);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the supplier");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateSupplier(@RequestBody SupplierDTO supplierDTO) {
        try {
            boolean isUpdate = supplierService.updateSupplier(supplierDTO);
            logger.info("Supplier Updated !");
            return isUpdate ? ResponseEntity.ok("Supplier Updated !") : ResponseEntity.badRequest().body("Failed to update the supplier");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to update the supplier");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("id") String id) {
        try {
            boolean isDelete = supplierService.deleteSupplier(id);
            logger.info("Supplier Deleted !");
            return isDelete ? ResponseEntity.ok("Supplier Deleted !") : ResponseEntity.badRequest().body("Failed to delete the supplier");
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to delete the supplier");
        }
    }

    @GetMapping("/get/id")
    public ResponseEntity<?> getSupplierId() {
        try {
            List<String> supplierId = supplierService.getSupplierId();
            logger.info("Supplier Id Fetched !");
            return ResponseEntity.ok(supplierId);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the supplier id");
        }
    }
}
