package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.HomeDTO;
import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.repo.CustomerRepo;
import lk.ijse.helloshoespvtapi.repo.InventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SaleInventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SaleRepo;
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
    private final SaleRepo saleRepo;
    private final CustomerRepo customerRepo;
    private final ModelMapper mapper;

    @Override
    public HomeDTO getSaleInventory(java.util.Date date) {
        if (date == null) {
            date = new Date(System.currentTimeMillis());
        }
        String maxSaleInventoryByDate = saleInventoryRepo.findMaxSaleInventoryByDate(date == null ? new Date(System.currentTimeMillis()) : date);
        if (maxSaleInventoryByDate == null) {
            return null;
        }
        String[] split = maxSaleInventoryByDate.split(",");
        Inventory inventory = inventoryRepo.findById(split[0]).get();
        int saleCount = Integer.parseInt(split[1]);
        Double sumOfTotalByDate = saleRepo.findSumOfTotalByDate(date == null ? new Date(System.currentTimeMillis()) : date);
        System.out.println("Sales " + sumOfTotalByDate);
        InventoryDTO map = mapper.map(inventory, InventoryDTO.class);
        long count = inventoryRepo.count();
        Double sumOfTotal = saleRepo.findSumOfTotal();
        long count1 = customerRepo.count();
        return new HomeDTO(null,map,sumOfTotalByDate,count,sumOfTotal,count1);
    }
}
