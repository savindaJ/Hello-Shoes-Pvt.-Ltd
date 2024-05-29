package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.RefundDTO;
import lk.ijse.helloshoespvtapi.dto.SaleDTO;
import lk.ijse.helloshoespvtapi.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

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
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    @PostMapping
    public ResponseEntity<?> saveSale(@RequestBody SaleDTO saleDTO){
        try{
            boolean isSave = saleService.saveSale(saleDTO);
            logger.info("Sale Saved !");
            return isSave ? ResponseEntity.ok("Sale Saved !") : ResponseEntity.badRequest().body("Failed to save the sale");
        }catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to save the sale");
        }
    }

    @GetMapping("/refund")
    public ResponseEntity<?> getCanRefundItems(){
        try{
            List<RefundDTO> canRefundItems = saleService.getCanRefundItems();
            logger.info("Can Refund Items Fetched !");
            return ResponseEntity.ok(canRefundItems);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the can refund items");
        }
    }

    @GetMapping("/total")
    public ResponseEntity<?> getTotalOfSale(){
        try{
            Double totalOfSale = saleService.getTotalOfSale();
            logger.info("Total of Sale Fetched !");
            return ResponseEntity.ok(totalOfSale);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the total of sale");
        }
    }
}
