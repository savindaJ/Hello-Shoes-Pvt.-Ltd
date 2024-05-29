package lk.ijse.helloshoespvtapi.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    public InventoryController(InventoryService inventoryService){
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<?> saveInventory(@RequestParam("item") String inventory, @RequestParam("itemImage") MultipartFile file) throws IOException {
       try{
           InventoryDTO inventoryDTO = new ObjectMapper().readValue(inventory, InventoryDTO.class);
           boolean isSave = inventoryService.saveInventory(inventoryDTO, file);
           logger.info("inventory Saved !");
           return isSave ? ResponseEntity.ok("Inventory Saved !") : ResponseEntity.badRequest().body("Failed to save the inventory");
       }catch (Exception e) {
           logger.severe(e.getMessage());
           return ResponseEntity.badRequest().body("Failed to save the inventory");
       }
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableInventory(){
        try{
            List<InventoryDTO> availableInventory = inventoryService.getAvailableInventory();
            logger.info("Available Inventory Fetched !");
            return ResponseEntity.ok(availableInventory);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the available inventory");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllInventory(){
        try{
            List<InventoryDTO> allInventory = inventoryService.getAllInventory();
            logger.info("All Inventory Fetched !");
            return ResponseEntity.ok(allInventory);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the inventory");
        }
    }

    @GetMapping("/{itemCode}")
    public ResponseEntity<?> getInventory(@PathVariable String itemCode){
        try{
            InventoryDTO inventory = inventoryService.getInventory(itemCode);
            logger.info("Inventory Fetched !");
            return ResponseEntity.ok(inventory);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the inventory");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateInventory(@RequestParam("item") String inventory, @RequestParam("itemImage") MultipartFile file) throws IOException {
        try{
            InventoryDTO inventoryDTO = new ObjectMapper().readValue(inventory, InventoryDTO.class);
            boolean isUpdate = inventoryService.updateInventory(inventoryDTO, file);
            logger.info("Inventory Updated !");
            return isUpdate ? ResponseEntity.ok("Inventory Updated !") : ResponseEntity.badRequest().body("Failed to update the inventory");
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to update the inventory");
        }
    }

    @GetMapping("/get/brands")
    public ResponseEntity<?> getBrands(){
        try{
            List<String> brands = inventoryService.getBrands();
            logger.info("Brands Fetched !");
            return ResponseEntity.ok(brands);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the brands");
        }
    }

    @GetMapping("/available/{brand}")
    public ResponseEntity<?> getAvailableInventory(@PathVariable String brand){
        try{
            List<InventoryDTO> availableInventory = inventoryService.getAvailableBrandItems(brand);
            logger.info("Available Brand Of Inventory Fetched !");
            return ResponseEntity.ok(availableInventory);
        }catch (Exception e){
            logger.severe(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to get the available inventory");
        }
    }
}
