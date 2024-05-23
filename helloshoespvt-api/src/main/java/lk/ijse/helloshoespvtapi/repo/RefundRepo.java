package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Repository
public interface RefundRepo extends JpaRepository<Refund,Long> {

    @Query(value = "SELECT SUM(sub_total) as total from refund",nativeQuery = true)
    Double findBySum();
}
