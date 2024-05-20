package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.InventoryDTO;

import java.util.Date;

/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
public interface SaleInventoryService {
    InventoryDTO getSaleInventory(Date date);
}
