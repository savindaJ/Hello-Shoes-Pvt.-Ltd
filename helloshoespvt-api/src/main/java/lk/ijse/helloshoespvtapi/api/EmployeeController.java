package lk.ijse.helloshoespvtapi.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import lk.ijse.helloshoespvtapi.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final Logger logger = Logger.getLogger(EmployeeController.class.getName());

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<?> saveEmployee(@RequestParam String employee,@RequestParam("image") MultipartFile file) throws IOException {
        try {
            boolean isSaved = employeeService.saveEmployee(new ObjectMapper().readValue(employee, EmployeeDTO.class),file);
            if (isSaved) {
                return ResponseEntity.ok("Employee Saved !");
            } else {
                return ResponseEntity.badRequest().body("Employee Save Failed !");
            }
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Employee Save Failed !");
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllEmployees(){
        try {
            List<EmployeeDTO> allAdmins = employeeService.getAllAdmins();
            logger.info("Employees fetched !");
            return ResponseEntity.ok(allAdmins);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Employees !");
        }
    }

    @GetMapping("/cashier")
    public ResponseEntity<?> getAllCashiers(){
        try {
            List<EmployeeDTO> allCashiers = employeeService.getAllCashiers();
            logger.info("Employees fetched !");
            return ResponseEntity.ok(allCashiers);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Employees !");
        }
    }

    @GetMapping("/{empId}")
    public ResponseEntity<?> getEmployee(@PathVariable("empId") String empId){
        try {
            EmployeeDTO employee = employeeService.getEmployee(empId);
            logger.info("Employee fetched !");
            return ResponseEntity.ok(employee);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Employee !");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateEmployee(@RequestParam("employee") String employee,@RequestParam("image") MultipartFile file) throws IOException {
        try {
            boolean isUpdated = employeeService.updateEmployee(new ObjectMapper().readValue(employee, EmployeeDTO.class),file);
            if (isUpdated) {
                logger.info("Employee Updated !");
                return ResponseEntity.ok("Employee Updated !");
            } else {
                logger.severe("Employee Update Failed !");
                return ResponseEntity.badRequest().body("Employee Update Failed !");
            }
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Employee Update Failed !");
        }
    }
}
