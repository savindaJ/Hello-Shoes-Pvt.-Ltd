package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.service.SaleInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HomeController {

    private final SaleInventoryService saleInventoryService;

    @GetMapping
    public InventoryDTO getHome(@RequestBody(required = false) Date date) {
        return saleInventoryService.getSaleInventory(date);
    }
}
