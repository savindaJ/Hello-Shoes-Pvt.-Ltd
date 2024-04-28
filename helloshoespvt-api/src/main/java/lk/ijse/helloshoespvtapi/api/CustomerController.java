package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.CustomerDTO;
import lk.ijse.helloshoespvtapi.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

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

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<?> saveCustomer(@RequestBody CustomerDTO customerDTO) throws URISyntaxException {
        boolean isSave = customerService.saveCustomer(customerDTO);
        return isSave ? ResponseEntity.created(new URI("/customers")).body("Customer Saved !") : ResponseEntity.badRequest().body("Customer Save Failed !");
    }
}
