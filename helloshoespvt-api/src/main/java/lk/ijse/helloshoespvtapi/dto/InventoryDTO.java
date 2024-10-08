package lk.ijse.helloshoespvtapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.helloshoespvtapi.entity.Supplier;
import lk.ijse.helloshoespvtapi.enums.ItemGender;
import lk.ijse.helloshoespvtapi.enums.ItemStatus;
import lk.ijse.helloshoespvtapi.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
    private String itemCode;
    private String supplierId;
    private String itemDescription;
    private String itemPicture;
    private Integer qtyOnHand;
    private Integer size;
    private Double buyingPrice;
    private Integer getqty;
    private String brand;
    private Double sellingPrice;
    private Double expectedProfit;
    private Integer itemSoldCount;
    private Integer getStockTotal;
    private Double profitMargin;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemStatus itemStatus;
    private Integer discount;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemType itemType;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ItemGender itemGender;
    private SupplierDTO supplier;
}
