package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 5/6/2024
 * @since : 0.1.0
 **/
@Repository
public interface SaleRepo extends JpaRepository<Sale,String> {
}
