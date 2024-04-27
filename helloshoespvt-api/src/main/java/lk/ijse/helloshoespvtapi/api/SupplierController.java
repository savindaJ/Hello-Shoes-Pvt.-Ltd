package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.SupplierDTO;
import lk.ijse.helloshoespvtapi.service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public ResponseEntity<?> saveSupplier(@RequestBody SupplierDTO supplierDTO){
        boolean isSave = supplierService.saveSupplier(supplierDTO);
        return isSave ? ResponseEntity.ok("Supplier Saved !") : ResponseEntity.badRequest().body("Failed to save the supplier");
    }

    @GetMapping
    public ResponseEntity<?> getAllSuppliers(){
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplier(@PathVariable("id") String id){
        return ResponseEntity.ok(supplierService.getSupplier(id));
    }

    @PutMapping
    public ResponseEntity<?> updateSupplier(@RequestBody SupplierDTO supplierDTO){
        boolean isUpdate = supplierService.updateSupplier(supplierDTO);
        return isUpdate ? ResponseEntity.ok("Supplier Updated !") : ResponseEntity.badRequest().body("Failed to update the supplier");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("id") String id){
        boolean isDelete = supplierService.deleteSupplier(id);
        return isDelete ? ResponseEntity.ok("Supplier Deleted !") : ResponseEntity.badRequest().body("Failed to delete the supplier");
    }
}
