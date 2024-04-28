package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.CustomerDTO;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
public interface CustomerService {
    boolean saveCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    boolean updateCustomer(CustomerDTO customerDTO);

    CustomerDTO getCustomer(String id);

    String deleteCustomer(String id);
}
