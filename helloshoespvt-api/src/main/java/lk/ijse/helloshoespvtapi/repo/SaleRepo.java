package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Sale;
import lk.ijse.helloshoespvtapi.projection.RefundProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 5/6/2024
 * @since : 0.1.0
 **/
@Repository
public interface SaleRepo extends JpaRepository<Sale,String> {
    @Query(value = "SELECT s.sale_id as saleId,s.cashier_name as cashierName,s.purchase_date as purchaseDate,sub_total as subTotal,s.customer_name as customerName,sd.inventory_id as inventoryId,i.item_description as itemDescription from sale s JOIN sale_inventory sd ON s.sale_id = sd.sale_id Join inventory i on sd.inventory_id = i.item_code WHERE s.purchase_date >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) order by s.purchase_date desc",nativeQuery = true)
    List<RefundProjection> getCanRefundItems();
}
