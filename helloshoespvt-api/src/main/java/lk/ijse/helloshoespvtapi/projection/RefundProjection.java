package lk.ijse.helloshoespvtapi.projection;

import java.sql.Timestamp;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
public interface RefundProjection {
    String getSaleId();

    String getCashierName();

    Timestamp getPurchaseDate();

    double getSubTotal();

    String getCustomerName();

    String getInventoryId();

    String getItemDescription();
}
