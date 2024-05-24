package lk.ijse.helloshoespvtapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author : savindaJ
 * @date : 5/23/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
    private Date date;
    private InventoryDTO inventoryDTO;
    private Double todayTotal;
    private long inventoryCount;
    private Double totalOfSales;
    private long customerCount;
}
