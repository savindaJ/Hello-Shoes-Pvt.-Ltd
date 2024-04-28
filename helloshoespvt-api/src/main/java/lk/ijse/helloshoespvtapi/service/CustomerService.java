package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.CustomerDTO;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
public interface CustomerService {
    boolean saveCustomer(CustomerDTO customerDTO);
}
