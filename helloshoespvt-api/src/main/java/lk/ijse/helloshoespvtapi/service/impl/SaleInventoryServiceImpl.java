package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.repo.InventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SaleInventoryRepo;
import lk.ijse.helloshoespvtapi.service.SaleInventoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;


/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
@Service
@RequiredArgsConstructor
public class SaleInventoryServiceImpl implements SaleInventoryService {

    private final SaleInventoryRepo saleInventoryRepo;
    private final InventoryRepo inventoryRepo;
    private final ModelMapper mapper;
    @Override
    public InventoryDTO getSaleInventory(java.util.Date date) {
        if (date == null){
            date = new Date(System.currentTimeMillis());
        }
        String maxSaleInventoryByDate = saleInventoryRepo.findMaxSaleInventoryByDate(date);
        if (maxSaleInventoryByDate == null){
            return null;
        }
        String[] split = maxSaleInventoryByDate.split(",");
        Inventory inventory = inventoryRepo.findById(split[0]).get();
        return mapper.map(inventory,InventoryDTO.class);
    }
}
