package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.SaleInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Repository
public interface SaleInventoryRepo extends JpaRepository<SaleInventory,Long> {
}
