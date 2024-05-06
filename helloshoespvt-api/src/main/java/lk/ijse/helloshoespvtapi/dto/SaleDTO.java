package lk.ijse.helloshoespvtapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.helloshoespvtapi.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 5/6/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {
    private String saleId;
    private Double subTotal;
    private String customerContact;
    private String customerName;
    private Integer addedPoints;
    private String cashierName;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private PaymentMethod paymentMethod;
    private Boolean isDemo;
    private List<InventoryDTO> orderDetails;

}
