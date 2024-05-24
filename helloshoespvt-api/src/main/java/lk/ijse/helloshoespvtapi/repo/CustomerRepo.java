package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
@Repository
public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query("SELECT c.contact FROM Customer c")
    List<String> findAllByContact();

    Customer findCustomerByContact(String contact);

    @Query(value = "SELECT * FROM customer where DATE(dob) = DATE(CURDATE())",nativeQuery = true)
    List<Customer> findDob();
}
