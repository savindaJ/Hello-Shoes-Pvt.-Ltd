package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.CustomerDTO;
import lk.ijse.helloshoespvtapi.entity.Customer;
import lk.ijse.helloshoespvtapi.entity.User;
import lk.ijse.helloshoespvtapi.repo.CustomerRepo;
import lk.ijse.helloshoespvtapi.repo.UserRepo;
import lk.ijse.helloshoespvtapi.service.CustomerService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepo customerRepo;

    private final ModelMapper mapper;

    private final UserRepo userRepo;

    public CustomerServiceImpl(CustomerRepo customerRepo, ModelMapper mapper,UserRepo userRepo) {
        this.customerRepo = customerRepo;
        this.mapper = mapper;
        this.userRepo = userRepo;
    }

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO) {
        Customer map = mapper.map(customerDTO, Customer.class);
        User user = userRepo.findById(customerDTO.getUserEmail()).get();
        map.setUser(user);
        map.setCustomerId(IDGenerator.generateCustomerId());
        customerRepo.save(map);
        return true;
    }
}
