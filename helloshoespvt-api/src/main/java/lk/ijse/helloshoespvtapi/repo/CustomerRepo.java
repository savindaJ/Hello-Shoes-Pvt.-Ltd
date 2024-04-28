package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
@Repository
public interface CustomerRepo extends JpaRepository<Customer,String> {
}
