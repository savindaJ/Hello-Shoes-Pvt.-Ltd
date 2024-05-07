package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.SaleDTO;
import lk.ijse.helloshoespvtapi.entity.Customer;
import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.entity.Sale;
import lk.ijse.helloshoespvtapi.enums.Level;
import lk.ijse.helloshoespvtapi.repo.CustomerRepo;
import lk.ijse.helloshoespvtapi.repo.InventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SaleRepo;
import lk.ijse.helloshoespvtapi.repo.UserRepo;
import lk.ijse.helloshoespvtapi.service.SaleService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : savindaJ
 * @date : 5/6/2024
 * @since : 0.1.0
 **/
@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final SaleRepo saleRepo;
    private final ModelMapper mapper;
    private final InventoryRepo inventoryRepo;
    private final CustomerRepo customerRepo;
    private final UserRepo userRepo;

    @Override
    @Transactional
    public boolean saveSale(SaleDTO saleDTO) {
        List<Inventory> inventories = new ArrayList<>();
        Sale sale = mapper.map(saleDTO, Sale.class);
        saleDTO.getInventories().forEach(inventory -> {
            inventoryRepo.findById(inventory.getItemCode()).ifPresent(entity -> {
                entity.setQtyOnHand(entity.getQtyOnHand() - inventory.getGetqty());
                entity.setItemSoldCount(entity.getItemSoldCount() + inventory.getGetqty());
                inventories.add(inventoryRepo.save(entity));
            });
        });
        sale.setSaleId(IDGenerator.generateSaleId());
        sale.setInventories(inventories);
        sale.setUser(userRepo.findById(saleDTO.getCashierName()).get());
        sale.setSubTotal(saleDTO.getSubTotal());
        if (!saleDTO.getIsDemo()) {
            Customer customer = customerRepo.findCustomerByContact(saleDTO.getCustomerContact());
            customer.setTotalPoints(customer.getTotalPoints() == null ? saleDTO.getAddedPoints() : customer.getTotalPoints() + saleDTO.getAddedPoints());
            int totalPoints = customer.getTotalPoints()+saleDTO.getAddedPoints();
            if (totalPoints<50) {
                customer.setLevel(Level.NEW);
            } else if (totalPoints < 100 && totalPoints >= 50) {
                customer.setLevel(Level.BRONZE);
            } else if(totalPoints < 200 && totalPoints >= 100){
                customer.setLevel(Level.SILVER);
            }else {
                customer.setLevel(Level.GOLD);
            }
            customer.setRecentPurchaseDate(new Date(System.currentTimeMillis()));
            sale.setCustomer(customerRepo.save(customer));
        } else {
            sale.setCustomer(null);
        }
        System.out.println(sale.getCustomer());
        saleRepo.save(sale);
        return true;
    }
}
