package lk.ijse.helloshoespvtapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundRequestDTO {
    private String saleId;
    private String inventoryId;
    private Integer quantity;
}
