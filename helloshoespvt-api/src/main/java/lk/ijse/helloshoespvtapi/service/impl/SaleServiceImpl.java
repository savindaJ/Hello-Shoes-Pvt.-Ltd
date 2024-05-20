package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.RefundDTO;
import lk.ijse.helloshoespvtapi.dto.SaleDTO;
import lk.ijse.helloshoespvtapi.entity.Customer;
import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.entity.Sale;
import lk.ijse.helloshoespvtapi.entity.SaleInventory;
import lk.ijse.helloshoespvtapi.enums.ItemStatus;
import lk.ijse.helloshoespvtapi.enums.Level;
import lk.ijse.helloshoespvtapi.repo.*;
import lk.ijse.helloshoespvtapi.service.EmailService;
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
    private final SaleInventoryRepo saleInventoryRepo;
    private final EmailService emailService;

    @Override
    @Transactional
    public boolean saveSale(SaleDTO saleDTO) {
        List<Inventory> inventories = new ArrayList<>();
        Sale sale = mapper.map(saleDTO, Sale.class);
        saleDTO.getInventories().forEach(inventory -> inventoryRepo.findById(inventory.getItemCode()).ifPresent(entity -> {
            entity.setQtyOnHand(entity.getQtyOnHand() - inventory.getGetqty());
            entity.setItemSoldCount(entity.getItemSoldCount() + inventory.getGetqty());
            Integer getStockTotal = entity.getGetStockTotal();
            int percentageInStock = (entity.getQtyOnHand() * 100) / getStockTotal;
            if (percentageInStock <= 50 && entity.getQtyOnHand() >= 1) {
                entity.setItemStatus(ItemStatus.LOW_STOCK);
            } else if (entity.getQtyOnHand() == 0) {
                entity.setItemStatus(ItemStatus.NOT_AVAILABLE);
            }
            inventories.add(inventoryRepo.save(entity));
        }));
        sale.setSaleId(IDGenerator.generateSaleId());
//        sale.setSaleInventories(inventories);
        sale.setUser(userRepo.findById(saleDTO.getCashierName()).get());
        sale.setSubTotal(saleDTO.getSubTotal());
        if (!saleDTO.getIsDemo()) {
            Customer customer = customerRepo.findCustomerByContact(saleDTO.getCustomerContact());
            customer.setTotalPoints(customer.getTotalPoints() == null ? saleDTO.getAddedPoints() : customer.getTotalPoints() + saleDTO.getAddedPoints());
            int totalPoints = customer.getTotalPoints() + saleDTO.getAddedPoints();
            if (totalPoints < 50) {
                customer.setLevel(Level.NEW);
            } else if (totalPoints < 100) {
                customer.setLevel(Level.BRONZE);
            } else if (totalPoints < 200) {
                customer.setLevel(Level.SILVER);
            } else {
                customer.setLevel(Level.GOLD);
            }
            customer.setRecentPurchaseDate(new Date(System.currentTimeMillis()));
            sale.setCustomer(customerRepo.save(customer));
            emailService.sendSimpleMessage(customer.getEmail(), "Purchase Confirmation", "Thank you for purchasing with us. Your total points are " + customer.getTotalPoints());
        } else {
            sale.setCustomer(null);
        }
        saleRepo.save(sale);

        saleInventoryRepo.saveAll(inventories.stream().map(inventory -> {
            SaleInventory saleInventory = new SaleInventory();
            saleInventory.setInventory(inventory);
            saleInventory.setSale(sale);
            saleInventory.setQuantity(saleDTO.getInventories().stream().filter(inventoryDTO -> inventoryDTO.getItemCode().equals(inventory.getItemCode())).findFirst().get().getGetqty());
            return saleInventory;
        }).toList());
        return true;
    }

    @Override
    public List<RefundDTO> getCanRefundItems() {
        List<RefundDTO> refundDTOS = new ArrayList<>();
        saleRepo.getCanRefundItems().forEach((refund)->{
            RefundDTO refundDTO = new RefundDTO();
            refundDTO.setSaleId(refund.getSaleId());
            refundDTO.setCashierName(refund.getCashierName());
            refundDTO.setPurchaseDate(refund.getPurchaseDate());
            refundDTO.setSubTotal(refund.getSubTotal());
            refundDTO.setCustomerName(refund.getCustomerName());
            refundDTO.setInventoryId(refund.getInventoryId());
            refundDTO.setItemDescription(refund.getItemDescription());
            refundDTO.setQuantity(refund.getQuantity());
            refundDTOS.add(refundDTO);
        });
        return refundDTOS;
    }
}
