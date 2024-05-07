package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.SaleDTO;
import lk.ijse.helloshoespvtapi.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : savindaJ
 * @date : 5/5/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/api/v1/sale")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<?> saveSale(@RequestBody SaleDTO saleDTO){
        boolean isPlaced = saleService.saveSale(saleDTO);
        return isPlaced ? ResponseEntity.ok("Sale Placed") : ResponseEntity.badRequest().body("Sale Not Placed");
    }
}
