package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.RefundDTO;
import lk.ijse.helloshoespvtapi.dto.RefundRequestDTO;
import lk.ijse.helloshoespvtapi.entity.Refund;
import lk.ijse.helloshoespvtapi.entity.Sale;
import lk.ijse.helloshoespvtapi.entity.SaleInventory;
import lk.ijse.helloshoespvtapi.repo.InventoryRepo;
import lk.ijse.helloshoespvtapi.repo.RefundRepo;
import lk.ijse.helloshoespvtapi.repo.SaleInventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SaleRepo;
import lk.ijse.helloshoespvtapi.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final SaleRepo saleRepo;
    private final InventoryRepo inventoryRepo;
    private final RefundRepo refundRepo;
    private final SaleInventoryRepo saleInventoryRepo;

    @Override
    public boolean addRefund(RefundRequestDTO refundDTO) {
        Sale sale = saleRepo.findById(refundDTO.getSaleId()).get();
        Double subTotal = sale.getSubTotal();
        Refund refund = new Refund();
        inventoryRepo.findById(refundDTO.getInventoryId()).ifPresent(inventory -> {
            inventory.setQtyOnHand(inventory.getQtyOnHand() + refundDTO.getQuantity());
            inventory.setItemSoldCount(inventory.getItemSoldCount() - refundDTO.getQuantity());
            Double sellingPrice = inventory.getSellingPrice()- inventory.getDiscount()/100 * inventory.getSellingPrice();
            Double refundAmount = sellingPrice * refundDTO.getQuantity();
            Double x = subTotal - refundAmount;
            System.out.println(x);
            sale.setSubTotal(x);
            refund.setSubTotal(refundAmount);
            inventoryRepo.save(inventory);
            sale.setAddedPoints(sale.getAddedPoints() - refundAmount.intValue() / 800);
            refund.setInventory(inventory);
        });
        SaleInventory bySaleAndInventory = saleInventoryRepo.findBySaleAndInventory(sale, inventoryRepo.findById(refundDTO.getInventoryId()).get());
        bySaleAndInventory.setQuantity(bySaleAndInventory.getQuantity() - refundDTO.getQuantity());
        saleInventoryRepo.save(bySaleAndInventory);
        if (bySaleAndInventory.getQuantity() == 0) {
            sale.setSubTotal(0.0);
            saleInventoryRepo.delete(bySaleAndInventory);
        }
        saleRepo.save(sale);
        refund.setSaleId(sale.getSaleId());
        refund.setCashierName(sale.getUser().getUsername());
        refund.setQuantity(refundDTO.getQuantity());
        refund.setCustomerName(sale.getCustomer() == null ? "Demo Customer" : sale.getCustomer().getCustomerName());
        refund.setItemDescription(refund.getInventory().getItemDescription());
        Refund save = refundRepo.save(refund);
        return save != null;
    }

    @Override
    public List<RefundDTO> getAllRefunds() {
        List<Refund> all = refundRepo.findAll();
        ModelMapper modelMapper = new ModelMapper();
        return all.stream().map(refund -> {
            RefundDTO map = modelMapper.map(refund, RefundDTO.class);
            map.setInventoryId(refund.getInventory().getItemCode());
            return map;
        }).toList();
    }

    @Override
    public Double getTotal() {
        return refundRepo.findBySum();
    }
}
