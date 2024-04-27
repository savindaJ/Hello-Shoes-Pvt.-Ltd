package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
public interface InventoryService {
    boolean saveInventory(InventoryDTO inventoryDTO, MultipartFile file) throws IOException;

    List<InventoryDTO> getAvailableInventory();

    List<InventoryDTO> getAllInventory();
}
