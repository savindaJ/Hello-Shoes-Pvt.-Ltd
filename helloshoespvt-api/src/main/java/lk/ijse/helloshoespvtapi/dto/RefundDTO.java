package lk.ijse.helloshoespvtapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundDTO {
    private String refundId;
    private String saleId;
    private String cashierName;
    @CreationTimestamp
    private Timestamp purchaseDate;
    private double subTotal;
    private String customerName;
    private String inventoryId;
    private String itemDescription;
    private Integer quantity;
}
