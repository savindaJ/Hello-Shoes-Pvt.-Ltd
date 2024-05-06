package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.SaleDTO;
import org.springframework.web.bind.annotation.*;

/**
 * @author : savindaJ
 * @date : 5/5/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/api/v1/sale")
public class SaleController {

    @PostMapping
    public void saveSale(@RequestBody SaleDTO saleDTO){
        System.out.println(saleDTO);
    }
}
