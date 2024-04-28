package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Repository
public interface InventoryRepo extends JpaRepository<Inventory, String> {
    List<Inventory> findAllByItemStatusNot(ItemStatus itemStatus);

    @Query(value = "SELECT DISTINCT brand FROM inventory" ,nativeQuery = true)
    List<String> getBrands();

    List<Inventory> findAllByBrandAndItemStatusNot(String brand, ItemStatus itemStatus);
}
