package lk.ijse.helloshoespvtapi.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import lk.ijse.helloshoespvtapi.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<?> saveEmployee(@RequestParam String employee,@RequestParam("image") MultipartFile file) throws IOException {
        System.out.println(employee);
        boolean isSave = employeeService.saveEmployee(new ObjectMapper().readValue(employee, EmployeeDTO.class),file);
        return isSave ? ResponseEntity.ok("Employee Saved !") : ResponseEntity.badRequest().body("Failed to save the employee");
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllAdmins());
    }

    @GetMapping("/cashier")
    public ResponseEntity<?> getAllCashiers(){
        return ResponseEntity.ok(employeeService.getAllCashiers());
    }

    @GetMapping("/{empId}")
    public ResponseEntity<?> getEmployee(@PathVariable("empId") String empId){
        return ResponseEntity.ok(employeeService.getEmployee(empId));
    }

    @PutMapping
    public ResponseEntity<?> updateEmployee(@RequestParam("employee") String employee,@RequestParam("image") MultipartFile file) throws IOException {
        boolean isUpdate = employeeService.updateEmployee(new ObjectMapper().readValue(employee, EmployeeDTO.class),file);
        return isUpdate ? ResponseEntity.ok("Employee Updated !") : ResponseEntity.badRequest().body("Failed to update the employee");
    }
}
