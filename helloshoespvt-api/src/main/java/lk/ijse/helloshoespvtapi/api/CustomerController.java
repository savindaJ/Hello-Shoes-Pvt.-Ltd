package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.CustomerDTO;
import lk.ijse.helloshoespvtapi.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.logging.Logger;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    private final Logger logger = Logger.getLogger(CustomerController.class.getName());

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<?> saveCustomer(@RequestBody CustomerDTO customerDTO) throws URISyntaxException {
        try {
            boolean isSaved = customerService.saveCustomer(customerDTO);
            if (isSaved) {
                return ResponseEntity.created(new URI("/api/v1/customers")).body("Customer Saved !");
            } else {
                return ResponseEntity.badRequest().body("Customer Save Failed !");
            }
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Customer Save Failed !");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllCustomers(){
        try {
            List<CustomerDTO> allCustomers = customerService.getAllCustomers();
            logger.info("Customers fetched !");
            return ResponseEntity.ok(allCustomers);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Customers !");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateCustomer(@RequestBody CustomerDTO customerDTO){
        try {
            boolean isUpdated = customerService.updateCustomer(customerDTO);
            if (isUpdated) {
                logger.info("Customer Updated !");
                return ResponseEntity.ok("Customer Updated !");
            } else {
                logger.severe("Customer Update Failed !");
                return ResponseEntity.badRequest().body("Customer Update Failed !");
            }
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Customer Update Failed !");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable String id){
        try {
            CustomerDTO customer = customerService.getCustomer(id);
            logger.info("Customer fetched !");
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Customer !");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String id){
        try {
            String message = customerService.deleteCustomer(id);
            logger.info("Customer deleted !");
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to delete Customer !");
        }
    }

    @GetMapping("/contact-list")
    public ResponseEntity<?> getContactList(){
        try {
            List<String> contactList = customerService.getContactList();
            logger.info("Contact List fetched !");
            return ResponseEntity.ok(contactList);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Contact List !");
        }
    }

    @GetMapping("/get/contact/{id}")
    public ResponseEntity<?> getContact(@PathVariable String id){
        try {
            CustomerDTO customer = customerService.getCustomerByContact(id);
            logger.info("Customer fetched by contact !");
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get Customer !");
        }
    }
}
