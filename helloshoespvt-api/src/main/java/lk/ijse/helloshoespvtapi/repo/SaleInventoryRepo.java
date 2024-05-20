package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.entity.Sale;
import lk.ijse.helloshoespvtapi.entity.SaleInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Repository
public interface SaleInventoryRepo extends JpaRepository<SaleInventory,Long> {
    SaleInventory findBySaleAndInventory(Sale sale, Inventory inventory);

    @Query(value = "SELECT si.inventory_id, SUM(si.quantity) as max_qty FROM sale s JOIN sale_inventory si on s.sale_id = si.sale_id WHERE DATE(s.purchase_date) = DATE(:selectedDate) GROUP BY si.inventory_id ORDER BY max_qty DESC LIMIT 1", nativeQuery = true)
    String findMaxSaleInventoryByDate(@Param("selectedDate") Date selectedDate);
}
